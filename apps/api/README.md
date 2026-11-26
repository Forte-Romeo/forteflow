# ForteFlow API

The ForteFlow API is the backend application powering the ForteFlow platform.

It is built with Node.js, Express 5, TypeScript, and PostgreSQL. The API follows a versioned REST architecture and uses direct SQL queries through the `pg` library.

## Technology Stack

- Node.js
- Express 5
- TypeScript
- PostgreSQL
- `pg` for PostgreSQL connectivity
- Zod for environment validation
- Pino and Pino HTTP for logging
- Helmet for HTTP security headers
- CORS for cross-origin request configuration
- Vitest for automated testing
- Supertest for HTTP endpoint testing

## Prerequisites

Before running the API locally, ensure you have:

- Node.js installed
- npm installed
- PostgreSQL installed and running
- The ForteFlow repository cloned locally

## Installation

From the repository root, install the project dependencies:

```bash
npm install
```

## Environment Configuration

Create a local environment file:

```bash
cp apps/api/.env.example apps/api/.env
```

Configure the following variables in `apps/api/.env`:

| Variable       | Description                  | Default                 |
| -------------- | ---------------------------- | ----------------------- |
| `NODE_ENV`     | Application environment      | `development`           |
| `PORT`         | API server port              | `3000`                  |
| `DATABASE_URL` | PostgreSQL connection string | Required                |
| `CORS_ORIGIN`  | Permitted frontend origin    | `http://localhost:5173` |

Example:

```dotenv
NODE_ENV=development
PORT=3000
DATABASE_URL=postgresql://postgres:password@localhost:5432/forteflow
CORS_ORIGIN=http://localhost:5173
```

Use your actual local PostgreSQL credentials.

Never commit `.env` files or expose database credentials.

## Running the API

Run the API development server from the repository root:

```bash
npm run dev:api
```

The default local API address is:

```text
http://localhost:3000
```

## API Versioning

All version 1 API endpoints are prefixed with:

```text
/api/v1
```

### Current Endpoints

| Method | Endpoint               | Purpose                          |
| ------ | ---------------------- | -------------------------------- |
| GET    | `/api/v1`              | API information                  |
| GET    | `/api/v1/health/live`  | API liveness check               |
| GET    | `/api/v1/health/ready` | API and database readiness check |

### Health Checks

**Liveness**

Returns HTTP `200` when the API process is running.

**Readiness**

Returns HTTP `200` when the API and PostgreSQL connection are available.

Returns HTTP `503` when the database dependency is unavailable.

## Database

The API uses PostgreSQL through a shared connection pool.

Database infrastructure is located in:

```text
src/db/
├── pool.ts
└── database.ts
```

- `pool.ts` configures the PostgreSQL connection pool.
- `database.ts` provides database connectivity and pool shutdown utilities.

The API currently uses direct SQL through `pg`. No ORM is used.

## Testing

Run the API test suite from the repository root:

```bash
npm run test:api
```

Run tests in watch mode:

```bash
npm run test:watch --workspace=@forteflow/api
```

Tests use Vitest and Supertest. Database connectivity is mocked in the API health-check tests, so those tests do not require a live PostgreSQL connection.

## Code Quality

From the repository root:

```bash
npm run build:api
npm run lint
npm run format:check
```

Run the frontend and full project build checks using the scripts defined in the root `package.json`.

## Project Structure

```text
apps/api/
├── src/
│   ├── config/
│   ├── db/
│   ├── features/
│   │   └── health/
│   ├── lib/
│   ├── middleware/
│   ├── routes/
│   ├── utils/
│   ├── app.ts
│   └── server.ts
├── tests/
├── .env.example
├── package.json
├── tsconfig.json
└── vitest.config.ts
```

## Development Principles

- Use TypeScript with strict type checking.
- Use ES module imports.
- Keep HTTP routing separate from controller logic.
- Keep business logic out of route definitions.
- Keep database access separate from HTTP controllers.
- Validate configuration at application startup.
- Use centralized error handling.
- Avoid exposing internal errors or secrets in HTTP responses.
- Write automated tests for new backend functionality.
