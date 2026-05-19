# Future Self

I built Future Self as a simple app for writing messages today and receiving them later in my inbox. It uses a NestJS API with a React (Vite) frontend, PostgreSQL for storage, Redis + BullMQ for scheduling and background jobs, and [Brevo](https://www.brevo.com/) for email delivery.

Users can write a message, choose a delivery date, and let the system handle the scheduling and sending automatically.

### Why

Most reminder apps are built around tasks and notifications. I wanted something more personal: a way to leave notes for myself that arrive at the right time.

Sometimes it’s a reflection I want to revisit months later, a message for an important milestone, encouragement before a difficult period, or just context I know I’ll forget with time. Future Self is built around that idea: delayed personal communication instead of productivity tooling.

## Prerequisites

- **Node.js** 22.x or current LTS
- **PostgreSQL** and **Redis** (local install or your own containers)
- **Brevo** API key only if you want real email (optional locally)

## Setup

### 1. Postgres and Redis

Run both on the hosts/ports you’ll put in `.env.local`. Defaults below assume `127.0.0.1`.

### 2. Backend

```bash
npm install
```

Create `.env.local` in the repo root. The app loads `.env.local` first, then `.env.prod` (`[app.module.ts](src/app.module.ts)`). Required keys: `[src/commons/interfaces/env.ts](src/commons/interfaces/env.ts)`.

```env
NODE_ENVIRONMENT=local
APP_PORT=3000
APP_KEY=your-secret-signing-key-change-me
ENABLE_RATE_LIMITING=false
DONT_SEND_EMAIL=true

REDIS_HOST=127.0.0.1
REDIS_PORT=6379
REDIS_USER=
REDIS_PASSWORD=

POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=future_self
POSTGRES_HOST=127.0.0.1
POSTGRES_PORT=5432
POSTGRES_HOST_DOCKER=postgres

EMAIL_SENDER_NAME=Future Self
EMAIL_SENDER_EMAIL=noreply@example.com
BREVO_API_ENDPOINT=https://api.brevo.com/v3
BREVO_API_KEY=your-brevo-api-key

FRONTEND_URL=http://localhost:5173
```

- `DONT_SEND_EMAIL=true` skips Brevo in dev.
- `FRONTEND_URL` must match where the Vite app runs (CORS).
- Use a strong `APP_KEY` outside local.

```bash
npm run start:dev
```

API listens on `APP_PORT` (log: `Server running on …`).

### 3. Frontend

```bash
cd frontend
npm install
cp .env.example .env
```

Set `VITE_API_URL` to your API origin (no trailing slash):

```env
VITE_API_URL=http://localhost:3000
```

Must match backend `APP_PORT`.

```bash
npm run dev
```

App: [http://localhost:5173](http://localhost:5173) (Vite default in `[frontend/vite.config.ts](frontend/vite.config.ts)`).

## Local dev

Two terminals:


| Terminal | Directory   | Command             |
| -------- | ----------- | ------------------- |
| API      | repo root   | `npm run start:dev` |
| UI       | `frontend/` | `npm run dev`       |


Register, compose a message, pick a future delivery time. With `DONT_SEND_EMAIL=true`, the queue still runs; email is skipped.

## Scripts

**API** (repo root)


| Command              | Purpose               |
| -------------------- | --------------------- |
| `npm run start:dev`  | Dev server with watch |
| `npm run build`      | Production build      |
| `npm run start:prod` | Run `dist/`           |
| `npm run lint`       | ESLint                |
| `npm run test`       | Unit tests            |
| `npm run test:e2e`   | E2E tests             |


**Frontend** (`frontend/`)


| Command           | Purpose                        |
| ----------------- | ------------------------------ |
| `npm run dev`     | Vite dev server                |
| `npm run build`   | Typecheck + production build   |
| `npm run preview` | Serve production build locally |
| `npm run lint`    | ESLint                         |


