from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
import os
import logging
from dotenv import load_dotenv
from supabase import create_client
from datetime import datetime, timezone
from typing import List

# Load .env if present
load_dotenv()

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")
if not SUPABASE_URL or not SUPABASE_KEY:
    raise RuntimeError("Environment variables SUPABASE_URL and SUPABASE_KEY must be set (see backend/.env.example)")

supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

# Logging
logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(name)s: %(message)s")
logger = logging.getLogger("student-advisor-api")

app = FastAPI(title="Student Advisor API")

# Allow local static site and other origins to fetch (lock this down in prod)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health")
async def health():
    return {"status": "ok"}


@app.get("/courses")
async def get_courses():
    try:
        res = supabase.table("courses").select("*, advisors(*)").execute()
        if getattr(res, "error", None):
            logger.error("Error fetching courses: %s", res.error)
            raise HTTPException(status_code=500, detail=str(res.error))
        return res.data
    except Exception as e:
        logger.exception("Unexpected error in get_courses")
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/advisors")
async def get_advisors():
    try:
        res = supabase.table("advisors").select("*").execute()
        if getattr(res, "error", None):
            logger.error("Error fetching advisors: %s", res.error)
            raise HTTPException(status_code=500, detail=str(res.error))
        return res.data
    except Exception as e:
        logger.exception("Unexpected error in get_advisors")
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/recommend")
async def recommend(request: Request):
    """Recommend courses for a student. Uses RPC if available, otherwise falls back to Python ranking."""
    payload = await request.json()
    student_id = payload.get("student_id")
    interests: List[str] = payload.get("interests") or []
    limit = int(payload.get("limit", 5))

    if student_id is None:
        raise HTTPException(status_code=400, detail="student_id is required in request body")

    # Try RPC first
    try:
        logger.info("Attempting RPC recommend_courses for student_id=%s", student_id)
        rpc_res = supabase.rpc("recommend_courses", {"student_id": int(student_id)}).execute()
        if not getattr(rpc_res, "error", None) and rpc_res.data:
            logger.info("RPC returned %d recommendations", len(rpc_res.data))
            return {"recommendations": rpc_res.data}
        logger.info("RPC returned no data or error, falling back to Python ranking")
    except Exception:
        logger.exception("RPC recommend_courses failed, falling back to Python ranking")

    # Fallback path: decompose into helpers to reduce complexity
    try:
        recommendations = await fallback_recommend(int(student_id), interests, limit)
        return {"recommendations": recommendations}
    except DataFetchError as dfe:
        logger.error("Data fetch error in fallback_recommend: %s", dfe)
        raise HTTPException(status_code=502, detail=str(dfe))
    except Exception as e:
        logger.exception("Unexpected error in fallback_recommend")
        raise HTTPException(status_code=500, detail=str(e))


class DataFetchError(Exception):
    """Raised when fetching data from Supabase fails."""
    pass


def fetch_all_courses():
    res = supabase.table("courses").select("*, advisors(*)").execute()
    if getattr(res, "error", None):
        raise DataFetchError(f"courses fetch failed: {res.error}")
    return res.data or []


def fetch_all_enrollments():
    res = supabase.table("enrollments").select("course_id,user_id").execute()
    if getattr(res, "error", None):
        raise DataFetchError(f"enrollments fetch failed: {res.error}")
    return res.data or []


def fetch_my_enrolled_ids(student_id: int):
    res = supabase.table("enrollments").select("course_id").eq("user_id", student_id).execute()
    if getattr(res, "error", None):
        raise DataFetchError(f"my enrollments fetch failed: {res.error}")
    return {r["course_id"] for r in (res.data or [])}


def compute_pop_counts(enrolls):
    counts = {}
    for e in enrolls:
        cid = e.get("course_id")
        counts[cid] = counts.get(cid, 0) + 1
    return counts


def parse_created_at(created: str):
    if not created:
        return None
    try:
        # Accept trailing Z as UTC
        if created.endswith("Z"):
            created = created.replace("Z", "+00:00")
        return datetime.fromisoformat(created)
    except Exception:
        return None


def score_course_item(c, pop_counts, interests, now):
    score = pop_counts.get(c.get("id"), 0)

    # advisor expertise boost
    adv = c.get("advisors")
    expertise_text = get_expertise_text(adv)
    if interests and expertise_text:
        lower_exp = expertise_text.lower()
        for it in interests:
            if it and it.lower() in lower_exp:
                score += 10

    # recency boost (timezone-aware)
    created = c.get("created_at")
    created_dt = parse_created_at(created)
    if created_dt and created_dt.tzinfo is None:
        created_dt = created_dt.replace(tzinfo=timezone.utc)
    if created_dt:
        days = (now - created_dt).days
        recency = max(0, 3 - days / 30)
        score += recency

    return score


def get_expertise_text(adv):
    if not adv:
        return ""
    if isinstance(adv, list):
        return " ".join([a.get("expertise", "") or "" for a in adv])
    if isinstance(adv, dict):
        return adv.get("expertise", "") or ""
    return ""


def fallback_recommend(student_id: int, interests: List[str], limit: int):
    all_courses = fetch_all_courses()
    all_enrolls = fetch_all_enrollments()
    my_enrolled_ids = fetch_my_enrolled_ids(student_id)

    pop_counts = compute_pop_counts(all_enrolls)
    now = datetime.now(timezone.utc)

    candidates = [c for c in all_courses if c.get("id") not in my_enrolled_ids]
    ranked = sorted(candidates, key=lambda c: score_course_item(c, pop_counts, interests, now), reverse=True)
    return ranked[:limit]
