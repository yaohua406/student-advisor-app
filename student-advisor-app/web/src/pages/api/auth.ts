// Archived duplicate auth API: use the Python backend and Supabase project directly.
export default function handler(req: any, res: any) {
  res.status(410).json({ error: 'This API route has been archived. Use the Python backend or web/legacy-react.' });
}