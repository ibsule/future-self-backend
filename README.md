# Futureself

I built Futureself as a simple app for writing messages today and receiving them later in my inbox. It uses a NestJS API with a React (Vite) frontend, PostgreSQL for storage, Redis + BullMQ for scheduling and background jobs, and [Brevo](https://www.brevo.com/) for email delivery.

Users can write a message, choose a delivery date, and let the system handle the scheduling and sending automatically.

### Why

Most reminder apps are built around tasks and notifications. I wanted something more personal: a way to leave notes for myself that arrive at the right time.

Sometimes it's a reflection I want to revisit months later, a message for an important milestone, encouragement before a difficult period, or just context I know I'll forget with time. Futureself is built around that idea: delayed personal communication instead of productivity tooling.

## Prerequisites

- **Node.js** 22.x or current LTS
- **pnpm** 11.x (`npm install -g pnpm`)
- **PostgreSQL** and **Redis** (local install or your own containers)
- **Brevo** API key only if you want real email (optional locally)
- Docker

## Production setup

Setup Futureself in production mode in your VPS or locally.

#### Step 1: Create `.env` file from `.env.example`

```bash
cp .env.example .env
```

### Step 2 (optional): Provide email credentials

> This step is only required if you want to receive emails. 

Provide the following credentials in `.env`:

```bash
EMAIL_SENDER_EMAIL= # Obtain from https://app.brevo.com/senders/list
BREVO_API_KEY= # Obtain from https://app.brevo.com/settings/keys/api
```

### Step 3: Run

```bash
docker compose up
```

***Access your Futureself instance at: `http://localhost:8010`***

> **Note** If you are running Futureself from a VPS, then your instance will be available at `http://<your-vps-host>:8010`

## Development setup

### 1. Postgres and Redis

The configurations for both Postgres and Redis are located in [./compose.yml](./compose.yml)

#### Run Postgres locally

Run the local instance of Postgres using the following command: 

```bash
docker compose up futureself-postgres
```

#### Run Redis locally

Run the local instance of Redis using the following command: 

```bash
docker compose up futureself-redis
```

### 2. Install dependencies

From the repo root:

```bash
pnpm install
```

This installs dependencies for both `apps/api` and `apps/web` in one shot.

### 3. Configure environment variables

First create `.env` from `.env.example` with the following command:

```bash
cp .env.example .env
```

Then set the value for both `NODE_ENVIRONMENT` and `VITE_NODE_ENVIRONMENT` to `local`

A few things to note

> - Set `DONT_SEND_EMAIL=true`. This skips Brevo in local development. If set to false, ensure to provide values for `EMAIL_SENDER_EMAIL` and `BREVO_API_KEY`
> - Use a strong `APP_KEY` and passwords outside local.

### 4. Run

Run both from the repo root:

```bash
pnpm dev          # starts both api and web concurrently
```

Or in separate terminals:


| Terminal | Command        |
| -------- | -------------- |
| API      | `pnpm dev:api` |
| Web      | `pnpm dev:web` |


- Web: [http://localhost:5173](http://localhost:5173).
- API: [http://localhost:5173](http://localhost:5001).

Register, compose a message, pick a future delivery time. With `DONT_SEND_EMAIL=true`, the queue still runs; email is skipped.

## Scripts

All scripts run from the **repo root** via pnpm:


| Command          | Purpose                       |
| ---------------- | ----------------------------- |
| `pnpm dev`       | Start both api and web        |
| `pnpm dev:api`   | API dev server with watch     |
| `pnpm dev:web`   | Vite dev server               |
| `pnpm build`     | Production build for both     |
| `pnpm build:api` | Production build for api only |
| `pnpm build:web` | Production build for web only |
| `pnpm test`      | Run all tests                 |
| `pnpm lint`      | Lint all packages             |
| `pnpm format`    | Format all packages           |


