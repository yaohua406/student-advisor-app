# Static Frontend

This is a minimal static frontend for the Student Advisor App.

To view locally:

Option A - serve the files with Python's simple HTTP server (recommended):

```powershell
cd web\static
python -m http.server 3000
# then open http://localhost:3000 in your browser
```

Option B - open `index.html` directly in the browser. Note: some browsers restrict fetch() from file:// origins, so Option A is recommended.

Change the backend URL in `index.html` (the `API_BASE` constant) if your backend runs at a different host/port.
