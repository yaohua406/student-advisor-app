// Minimal shim that proxies certain supabase-js calls to the Python backend API.
const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:8000';

async function fetchJson(path: string, opts?: RequestInit) {
  const res = await fetch(`${API_BASE}${path}`, opts);
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Request failed ${res.status}: ${text}`);
  }
  return res.json();
}

export const supabase = {
  from: (table: string) => ({
    select: async (_cols = '*') => {
      const data = await fetchJson(`/${table}`);
      return { data, error: null };
    }
  }),
  auth: {
    // minimal getSession stub — the legacy Next app used this
    getSession: async () => ({ data: { session: null } }),
    onAuthStateChange: (_cb: any) => ({ data: { subscription: { unsubscribe: () => {} } } }),
    getUser: async () => ({ data: { user: null }, error: null })
  }
};

export default supabase;
