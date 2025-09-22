# HeartTrack (Unified)

This is a single-directory starter for HeartTrack — a simple Vite + React frontend bundled with a serverless Express API (under `/api`) for deploying to Vercel.

Quick notes:
- Deploy to Vercel by connecting this repository. Vercel will build the frontend (vite) and use `/api/index.js` as serverless functions.
- Default admin account: admin@hearttrack.com / admin123
- This project uses an in-memory "database" (for demo only). For production, replace with a real DB.

Commands:
- `npm install`
- `npm run dev` (local dev with Vite)
- `npm run build` (build frontend)
