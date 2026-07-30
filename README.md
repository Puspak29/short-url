# Short URL

URL shortener with analytics, authentication, and subscription-based plans.

## Stack

- **Server:** Express 5 + Mongoose 9 + Redis (CommonJS)
- **Client:** React 19 + Vite 7 + Tailwind 4 + TypeScript (ESM)
- **Database:** MongoDB 7
- **Payments:** Razorpay
- **Infra:** Docker Compose, Vercel (client), Render (server)

## Quick Start

### Local (no Docker)

```bash
# Server
cd server
cp .env.example .env        # edit with your values
npm install
npm run dev                  # http://localhost:8080

# Client (separate terminal)
cd client
cp .env.example .env         # VITE_BACKEND_URL points to server
npm install
npm run dev                  # http://localhost:5173
```

### Docker

```bash
docker compose up
```

| Service | URL |
|---|---|
| Client | http://localhost:5173 |
| Server | http://localhost:8000 |
| MongoDB | localhost:27017 |
| Redis | localhost:6379 |

Server env is loaded from `server/.env.test.local`. Client env is set via `compose.yaml` `environment` — update `VITE_BACKEND_URL` if needed.

## Structure

```
├── compose.yaml            # Docker Compose (server + client + mongo + redis)
├── server/
│   ├── Dockerfile
│   ├── src/
│   │   ├── app.js          # Express app setup
│   │   ├── config/         # env, db, redis, razorpay, plan limits
│   │   ├── models/         # Mongoose schemas
│   │   ├── modules/        # auth, url, subscription (routes + controllers + service)
│   │   ├── middlewares/    # auth, plan, rate limiter, validator
│   │   └── utils/          # sendResponse, handleError, jwt, shortId, logger
│   └── tests/
├── client/
│   ├── Dockerfile
│   └── src/
│       ├── App.tsx         # React Router setup
│       ├── components/     # UI components
│       ├── stores/         # Zustand stores
│       └── actions/        # API calls
```

## Commands

### Server

| Command | Description |
|---|---|
| `npm run dev` | Dev with nodemon |
| `npm start` | Production start |
| `npm test` | Run all tests (Jest, `--runInBand`) |

### Client

| Command | Description |
|---|---|
| `npm run dev` | Vite dev server |
| `npm run build` | TypeScript check + Vite build |
| `npm run lint` | ESLint |

## API

| Prefix | Auth | Description |
|---|---|---|
| `/api/auth` | Mixed | Register, login, check |
| `/api/url` | Protected | CRUD, toggle, stats |
| `/api/subscription` | Protected | Razorpay orders, verify, cancel |
| `/r/:shortCode` | Public | 302 redirect |

Stats endpoint (`/api/url/stats/:id`) requires pro or enterprise plan.

## Plans

| Plan | Price/mo | URLs/mo | Custom slugs |
|---|---|---|---|
| Free | ₹0 | 10 | 2 (lifetime) |
| Pro | ₹89 | 100 | 20 |
| Enterprise | ₹299 | 1000 | 200 |
