# Backend (FastAPI) for Student Advisor App

This small FastAPI app exposes simple endpoints that query your Supabase PostgreSQL tables.

Required environment variables:

- `SUPABASE_URL` — your Supabase project URL (e.g. https://abcd.supabase.co)
- `SUPABASE_KEY` — An anon or service role key (keep service key secret)

Install and run locally (Windows Powershell example):

```powershell
python -m venv .venv; .\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
$env:SUPABASE_URL = "https://your-project.supabase.co"
$env:SUPABASE_KEY = "your-supabase-key"
uvicorn backend.app:app --reload --host 0.0.0.0 --port 8000
```

Endpoints:

- `GET /health` — basic health check
- `GET /courses` — returns rows from `courses` table
- `GET /advisors` — returns rows from `advisors` table
- `POST /recommend` — placeholder to return recommendations

Notes:
- This app uses the `supabase` Python client. Ensure your Supabase DB has `courses` and `advisors` tables (see your project's migrations/seed SQL files).
- For production, use proper secret management for keys and tighten CORS origins.
