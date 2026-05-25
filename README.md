# KYK / KYL — Know Your Locality

Two-folder workspace:

- `frontend/` — Angular 21 SSR app
- `backend/` — Express + MongoDB + WebSocket + Gemini

## 1. First-time setup

### Backend

```bash
cd backend
npm install
cp .env .env   # already created with your Atlas URI; edit if needed
```

Open `backend/.env` and confirm:

- `MONGODB_URI` — your Atlas SRV string
- `GOOGLE_CLIENT_ID` — see step 3 below
- `GEMINI_API_KEY` — your Gemini key
- `JWT_SECRET` — replace with a long random string

### Frontend

```bash
cd frontend
npm install
```

Open `frontend/src/environments/environment.ts` and set
`googleClientId` to the same value as `GOOGLE_CLIENT_ID` in backend `.env`.

## 2. Run

In two terminals:

```bash
# terminal 1
cd backend && npm run dev   # http://localhost:3000

# terminal 2
cd frontend && npm start    # http://localhost:4200
```

## 3. Google sign-in setup

1. https://console.cloud.google.com/ → APIs & Services → Credentials.
2. Create an OAuth 2.0 Client ID, type **Web application**.
3. Authorized JavaScript origins: `http://localhost:4200`.
4. Copy the client ID into both:
   - `backend/.env` → `GOOGLE_CLIENT_ID`
   - `frontend/src/environments/environment.ts` → `googleClientId`
5. Restart both processes.

## 4. MongoDB Atlas

- Network Access → add your current IP (or `0.0.0.0/0` for testing).
- Database Access → user must have `readWrite` on the `kyk` database.
- The URI in `.env` already includes the URL-encoded password (`@` → `%40`).

## 5. Architecture

### Backend (MVC)

```
backend/
  server.js                  # entry: connect db, start http + ws
  .env / .env.example
  src/
    app.js                   # express app + middleware
    config/db.js             # mongoose connect
    models/
      User.js                # auth + profile + per-mode distance caps
      Message.js              # chat history with the AI
    controllers/
      auth.controller.js     # POST /api/auth/google, GET /api/auth/me
      user.controller.js     # PATCH /api/users/me, GET /api/users/caps
      chat.controller.js     # GET /api/chat/history, POST /api/chat
    middleware/
      auth.middleware.js     # JWT verify + Bearer guard
    services/
      gemini.service.js      # Gemini REST client (no SDK)
    sockets/
      chat.socket.js         # /ws/chat WebSocket -> Gemini
    routes/
      index.js               # mounts /api router
```

### Frontend

- `services/auth.service.ts` — Google sign-in via backend, JWT + user signal.
- `services/geolocation.service.ts` — browser geolocation + per-mode caps.
- `services/ai-chat.service.ts` — WebSocket chat with REST fallback.
- `pages/auth/` — Google Identity Services sign-in button only.
- `pages/preferences/` — geolocation, mode-aware distance slider.
- `pages/dashboard/` — AI Planner tab now talks to Gemini.

## 6. Distance caps

Enforced in three places (defense in depth):

| Mode | Cap (km) |
| ---- | -------- |
| Car  | 80       |
| Bike | 40       |
| Walk | 20       |

- Frontend: `GeolocationService.clamp()` and the slider's `max`.
- Backend: `User.pre('save')` hook + `user.controller.updateMe`.
- Source of truth: `backend/src/models/User.js` (`DISTANCE_CAPS`) and
  `frontend/src/environments/environment.ts` (`distanceCaps`).

## 7. Security notes

- **Rotate** the Mongo password and Gemini API key — they were pasted
  in plain text during the build session.
- The Gemini key is **only** read on the backend and must never end up
  in the Angular bundle.
- Lock the Atlas IP allowlist down for production.
- Restrict the Gemini API key to your server IP / referrers in Google
  Cloud Console.
