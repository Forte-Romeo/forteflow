# ForteFlow Backend Architecture

## 1. Overview

The ForteFlow backend is a versioned REST API built with Node.js, Express 5, TypeScript, and PostgreSQL.

Its purpose is to provide a maintainable backend foundation that can support the platform as its features and complexity grow.

The architecture prioritizes:

- Separation of responsibilities
- Explicit data access
- Type safety
- Centralized error handling
- Secure configuration
- Observability through structured logging
- Automated testing
- Incremental feature development

The backend currently provides infrastructure and health-check functionality. Full business features and authentication have not yet been implemented.

## 2. Technology Decisions

| Area                     | Technology | Reason                            |
| ------------------------ | ---------- | --------------------------------- |
| Runtime                  | Node.js    | JavaScript runtime                |
| HTTP framework           | Express 5  | REST API and middleware           |
| Language                 | TypeScript | Static type checking              |
| Module system            | ES Modules | Consistent modern module system   |
| Database                 | PostgreSQL | Relational data storage           |
| Database driver          | `pg`       | Direct SQL and connection pooling |
| Configuration validation | Zod        | Runtime environment validation    |
| Logging                  | Pino       | Structured application logging    |
| HTTP logging             | Pino HTTP  | Request and response logging      |
| HTTP security            | Helmet     | Security-related HTTP headers     |
| Cross-origin access      | CORS       | Controlled frontend access        |
| Testing                  | Vitest     | Test execution and assertions     |
| HTTP testing             | Supertest  | Express endpoint testing          |

The backend uses direct SQL rather than an ORM. This keeps database interactions explicit and gives the application control over its queries.

## 3. Application Structure

```text
apps/api/
├── src/
│   ├── config/
│   │   ├── env.schema.ts
│   │   └── env.ts
│   ├── db/
│   │   ├── database.ts
│   │   └── pool.ts
│   ├── features/
│   │   └── health/
│   │       ├── health.controller.ts
│   │       └── health.routes.ts
│   ├── lib/
│   │   └── logger.ts
│   ├── middleware/
│   │   ├── error-handler.ts
│   │   └── not-found-handler.ts
│   ├── routes/
│   │   └── api.routes.ts
│   ├── utils/
│   │   └── app-error.ts
│   ├── app.ts
│   └── server.ts
├── tests/
│   ├── app.test.ts
│   └── setup.ts
├── .env.example
├── package.json
├── tsconfig.json
└── vitest.config.ts
```

### Directory Responsibilities

#### `config/`

Contains application configuration and environment validation.

Environment variables are validated with Zod before application startup proceeds.

#### `db/`

Contains PostgreSQL connection infrastructure.

- `pool.ts` creates and configures the shared connection pool.
- `database.ts` provides connection-checking and pool-shutdown utilities.

#### `features/`

Contains feature-specific application functionality.

Each feature can own its routes, controllers, services, repositories, schemas, types, and tests as its implementation requires.

The health feature is the initial example.

#### `lib/`

Contains shared infrastructure integrations, such as the application logger.

#### `middleware/`

Contains reusable Express middleware, including not-found and centralized error handling.

#### `routes/`

Contains central API route registration and versioning.

#### `utils/`

Contains reusable application utilities, including the operational application error class.

#### `app.ts`

Creates and configures the Express application.

It registers request logging, security middleware, CORS, body parsing, API routes, and error-handling middleware.

#### `server.ts`

Acts as the API process entry point and starts the HTTP server.

#### `tests/`

Contains automated backend tests and test environment setup.

## 4. Request Lifecycle

An incoming API request follows this general sequence:

1. The request reaches the Express application.
2. Pino HTTP records request activity.
3. Helmet applies HTTP security headers.
4. CORS evaluates cross-origin access.
5. Express parses JSON request bodies.
6. The versioned API router matches the request.
7. A feature route delegates to its controller.
8. The controller invokes the required application functionality.
9. The response is returned to the client.
10. Unmatched routes and errors are handled by centralized middleware.

For future business features, services and repositories will extend this flow without placing business or database logic inside route definitions.

## 5. Architectural Layers

The backend follows a layered approach.

### Routes

Responsible for mapping HTTP methods and paths to controllers.

Routes should not contain business rules or direct database queries.

### Controllers

Responsible for HTTP-level concerns:

- Reading request parameters and bodies
- Invoking application functionality
- Choosing appropriate HTTP responses
- Returning consistent response structures

Controllers should remain relatively thin.

### Services

Responsible for application and business logic.

Services coordinate operations, enforce business rules, and manage workflows.

### Repositories

Responsible for database access.

Repositories encapsulate SQL queries and database persistence operations.

### Database Infrastructure

Responsible for connection pooling and shared database connectivity.

The intended interaction is:

```text
HTTP Request
     |
     v
   Route
     |
     v
 Controller
     |
     v
  Service
     |
     v
 Repository
     |
     v
 PostgreSQL
```

Not every feature needs every layer immediately. Simple functionality should not receive unnecessary abstractions.

## 6. Environment Configuration

Environment variables are loaded and validated through the configuration layer.

Current configuration:

- `NODE_ENV`
- `PORT`
- `DATABASE_URL`
- `CORS_ORIGIN`

Invalid configuration prevents the application from starting.

Secrets and local environment files must not be committed.

## 7. Database Architecture

The application uses PostgreSQL through the `pg` package.

A shared connection pool manages database connections.

Current pool configuration includes:

- Maximum of 10 connections
- 30-second idle timeout
- 5-second connection timeout
- Logging for unexpected errors on idle clients

Database operations should use parameterized SQL queries to prevent SQL injection.

Transactions should use a single checked-out client for all statements within the transaction.

Repositories will own persistence queries as feature development progresses.

## 8. API Versioning

The current API prefix is:

```text
/api/v1
```

All version 1 endpoints are registered through the central API router.

New endpoints should be added through their relevant feature router and registered centrally.

## 9. Error Handling

The application uses a centralized error-handling middleware.

`AppError` represents known operational application errors with:

- HTTP status code
- Application error code
- Safe client-facing message

Unexpected errors produce a generic HTTP 500 response.

Internal error details are logged rather than exposed to clients.

Unknown routes are converted into a standardized 404 application error.

## 10. Logging and Observability

Pino provides structured application logging.

Pino HTTP records HTTP request activity.

Sensitive request and response headers are configured for redaction.

Logging levels are adjusted for the test environment.

Logs should never expose passwords, authentication tokens, database credentials, or other secrets.

## 11. Security Foundations

Current security foundations include:

- Helmet security headers
- CORS origin restrictions
- Disabled Express technology disclosure
- Centralized error responses
- Environment validation
- Sensitive-header redaction
- Parameterized SQL as the database query convention

These are foundational controls, not a complete security implementation.

Additional controls will be required as authentication, user accounts, and business functionality are introduced.

## 12. Health Checks

Three initial endpoints are available:

| Endpoint                   | Purpose                                          |
| -------------------------- | ------------------------------------------------ |
| `GET /api/v1`              | API baseline information                         |
| `GET /api/v1/health/live`  | Confirms the API process is alive                |
| `GET /api/v1/health/ready` | Checks API readiness and PostgreSQL connectivity |

Liveness does not depend on database availability.

Readiness returns HTTP 503 when PostgreSQL cannot be reached.

## 13. Testing Strategy

Vitest is the backend test runner, and Supertest is used for HTTP-level testing.

Tests can exercise the Express application without starting a network server.

External dependencies such as PostgreSQL are mocked when the purpose of a test is to verify HTTP behaviour.

As the backend grows, testing should include:

- Unit tests for services and utilities
- Repository tests against a controlled test database
- Integration tests for application workflows
- HTTP tests for routes and middleware
- Validation and error-handling tests

Tests should be deterministic and independent of production data.

## 14. Current Implementation Boundaries

The following are not yet implemented as part of the backend foundation:

- User authentication and authorization
- Business feature services and repositories
- Database schema and application migrations
- Database transaction utilities
- Password management
- API rate limiting
- Production deployment configuration
- Automated database integration-test infrastructure
- Complete API reference documentation

These should be introduced as their respective implementation stages require them.

## 15. Architectural Principles for Future Development

1. Keep route definitions focused on HTTP routing.
2. Keep controllers focused on HTTP request and response handling.
3. Put business rules in services.
4. Put persistence logic in repositories.
5. Use parameterized SQL for database queries.
6. Use transactions for operations requiring atomicity.
7. Validate untrusted input at application boundaries.
8. Keep environment configuration centralized.
9. Use consistent response and error structures.
10. Test important behaviour at the appropriate layer.
11. Avoid introducing abstractions without a demonstrated need.
12. Preserve clear boundaries between features and shared infrastructure.

## 16. Architecture Status

This document describes the current backend foundation. It should be updated whenever an architectural decision materially changes.

The architecture is intended to evolve incrementally as ForteFlow moves from infrastructure into functional application development.
