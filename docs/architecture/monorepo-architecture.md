# ForteFlow Monorepo Architecture

## 1. Overview

ForteFlow uses an npm workspaces monorepo architecture to organize its
applications, shared packages, and project-wide development resources
within a single Git repository.

The architecture is designed to support the gradual development of a
full-stack business management platform while maintaining clear
boundaries between frontend, backend, and shared functionality.

The repository currently contains the web application. The backend API
and reusable shared packages will be introduced in subsequent
development phases.

### Architectural objectives

- Maintain a clear separation of application responsibilities.
- Centralize dependency and workspace management.
- Establish consistent development tooling across applications.
- Support independent application development and testing.
- Enable future code sharing through dedicated packages.
- Avoid unnecessary abstractions and premature package creation.
- Preserve a maintainable development and deployment workflow.

## 2. Architecture Style

ForteFlow follows a monorepo architecture managed through npm workspaces.

All applications and packages belong to one repository and share a
root-level dependency management system.

Each application maintains its own package manifest and declares its
application-specific dependencies and scripts.

Project-wide development tools and configurations are maintained at
the repository root.

### Workspace management

npm workspaces are used to:

- Discover applications and packages.
- Install dependencies from the repository root.
- Manage local workspace relationships.
- Execute scripts within individual workspaces.
- Maintain one root package-lock.json.

The root package.json is the workspace entry point.

## 3. Repository Structure

The current and planned repository structure is:

```text
forteflow/
│
├── apps/
│   ├── web/
│   │   ├── public/
│   │   ├── src/
│   │   ├── tests/
│   │   ├── index.html
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   ├── tsconfig.app.json
│   │   ├── tsconfig.node.json
│   │   └── vite.config.ts
│   │
│   └── api/                    # Planned
│
├── packages/                   # Reserved for shared packages
│
├── docs/
│   └── architecture/
│       └── monorepo-architecture.md
│
├── .github/
│   ├── ISSUE_TEMPLATE/
│   └── workflows/
│
├── eslint.config.js
├── .gitignore
├── .prettierignore
├── .prettierrc.json
├── package.json
├── package-lock.json
└── README.md
```

The structure distinguishes between applications, reusable packages,
and project-wide resources.

### 3.1 apps/

Contains independently executable applications that form part of
the ForteFlow platform.

#### apps/web

The frontend application.

Technology:

- React
- TypeScript
- Vite
- Tailwind CSS
- React Router
- Recharts
- React Hook Form
- Zod
- Lucide React

Responsibilities:

- User interface and interaction.
- Client-side routing.
- Frontend state and presentation.
- Form handling and client-side validation.
- Communication with backend services.
- Responsive application experience.

The frontend is maintained as an independent npm workspace.

#### apps/api

Reserved for the backend application.

The API will be introduced during the backend foundation phase.

Planned technology:

- Node.js
- Express
- TypeScript
- PostgreSQL
- node-postgres (`pg`)
- node-pg-migrate
- Zod
- Pino
- Helmet
- CORS
- dotenv
- Vitest
- Supertest

Responsibilities will include:

- HTTP API endpoints.
- Business logic.
- Authentication and authorization.
- Database access.
- Request validation.
- Centralized error handling.
- Logging and observability.

The API will have its own package.json and TypeScript configuration.

### 3.2 packages/

Reserved for reusable packages shared between applications.

Packages will only be introduced when genuine reuse or a clear
architectural boundary justifies them.

Potential future packages include:

- Shared validation schemas.
- Shared domain types.
- Shared configuration.
- Reusable utilities.

A package must have a clearly defined responsibility and an explicit
consumer.

Shared packages should not become dumping grounds for unrelated code.

### 3.3 docs/

Contains project-wide documentation.

Documentation is maintained outside individual applications when it
describes the overall platform, architecture, development standards,
or cross-application decisions.

Application-specific documentation may be placed within the relevant
application when appropriate.

### 3.4 .github/

Contains repository-wide GitHub configuration, issue templates,
and future CI/CD workflows.

### 3.5 Root configuration files

The repository root owns shared development configuration.

| File              | Responsibility                        |
| ----------------- | ------------------------------------- |
| package.json      | Workspace management and root scripts |
| package-lock.json | Central dependency lockfile           |
| eslint.config.js  | Repository-wide linting configuration |
| .prettierrc.json  | Formatting rules                      |
| .prettierignore   | Formatting exclusions                 |
| .gitignore        | Git exclusions                        |

## 4. Dependency Management

ForteFlow uses npm as its package manager.

### 4.1 Root dependencies

The root package.json contains development tools shared across
applications.

Examples:

- ESLint
- Prettier
- TypeScript
- Shared linting configuration

### 4.2 Application dependencies

Each application declares its own dependencies.

For example, apps/web/package.json contains frontend dependencies
such as React, Vite, Tailwind CSS, React Router, and Recharts.

Backend dependencies will be declared in apps/api/package.json
when the API workspace is introduced.

### 4.3 Installation rules

Dependencies must be installed from the repository root.

Install all workspace dependencies:

```bash
npm install
```

Install a dependency for the web application:

```bash
npm install <package-name> --workspace=@forteflow/web
```

Install a development dependency for the web application:

```bash
npm install <package-name> --workspace=@forteflow/web --save-dev
```

Install a dependency for the API when its workspace exists:

```bash
npm install <package-name> --workspace=@forteflow/api
```

Do not maintain independent lockfiles inside individual applications.

The repository must maintain one root package-lock.json.

## 5. Workspace Scripts

Root scripts provide convenient access to common application tasks.

### 5.1 Root-level commands

Run the frontend development server:

```bash
npm run dev
```

Build the frontend:

```bash
npm run build
```

Run repository linting:

```bash
npm run lint
```

Run the frontend production preview:

```bash
npm run preview
```

Format supported repository files:

```bash
npm run format
```

Check formatting:

```bash
npm run format:check
```

### 5.2 Workspace-specific commands

Run a script directly within the web workspace:

```bash
npm run dev --workspace=@forteflow/web
```

Build only the web application:

```bash
npm run build --workspace=@forteflow/web
```

Run frontend-specific linting:

```bash
npm run lint --workspace=@forteflow/web
```

Root scripts should remain convenient entry points, while
workspace-specific commands remain available for targeted operations.

## 6. TypeScript Configuration

Each application owns its TypeScript configuration.

The web application currently maintains:

- tsconfig.json
- tsconfig.app.json
- tsconfig.node.json

These configurations support the React application and its Vite
configuration.

Application-specific compiler options should remain with the
application unless a genuine shared configuration requirement
emerges.

The backend will receive its own TypeScript configuration when
introduced.

## 7. Code Organization Principles

ForteFlow follows these principles:

### 7.1 Separation of concerns

Applications own their respective runtime responsibilities.

Frontend presentation and interaction should not contain backend
database access or server-side business logic.

Backend responsibilities should not be implemented inside the
frontend application.

### 7.2 Explicit dependencies

Applications must declare the dependencies they require.

Shared packages must expose clear public interfaces.

### 7.3 Avoid premature abstraction

Do not introduce shared packages simply because two files look
similar.

Create abstractions when they solve an actual maintenance,
consistency, or reuse problem.

### 7.4 Independent application boundaries

Each application should be independently understandable, configurable,
and testable.

Applications may communicate through documented interfaces rather
than depending on another application's internal implementation.

### 7.5 Consistent conventions

All applications should follow the repository's established
formatting, naming, linting, and Git conventions.

## 8. Development Workflow

### 8.1 Starting development

From the repository root:

```bash
npm install
npm run dev
```

### 8.2 Building

```bash
npm run build
```

Application-specific build commands may be executed through
their respective workspaces.

### 8.3 Quality checks

Before committing changes, run the relevant checks:

```bash
npm run lint
npm run format:check
npm run build
```

### 8.4 Git workflow

Development follows feature-based branches and conventional commits.

Examples:

```text
feat: add client management
fix: resolve invoice calculation issue
refactor: improve project service structure
test: add authentication service tests
docs: document API architecture
chore: update development dependencies
```

Changes should be committed in logical, reviewable units.

## 9. Testing Strategy

Testing is organized around application responsibilities.

### 9.1 Web application

The web application will own its frontend unit and component tests.

Planned tooling:

- Vitest
- React Testing Library

### 9.2 Backend API

The API will own its backend unit and integration tests.

Planned tooling:

- Vitest
- Supertest

### 9.3 Cross-application testing

Cross-application tests may be introduced when integration boundaries
require them.

Test tooling should be selected according to the application's
requirements rather than duplicated without purpose.

## 10. Build and Deployment Strategy

The monorepo does not require all applications to share the same
deployment target.

Each application may be built and deployed independently.

The web application will have its own frontend deployment workflow.

The API will have its own backend deployment workflow when
introduced.

Shared packages, if introduced, must be included in the relevant
application build process.

Deployment configuration must remain explicit and reproducible.

## 11. Future Architecture Evolution

The repository is expected to evolve through the following stages:

1. Web application foundation.
2. Backend API initialization.
3. Database foundation and migrations.
4. Authentication and authorization.
5. Frontend-backend integration.
6. Shared package introduction where justified.
7. Automated testing and deployment improvements.

Architectural changes should be documented when they materially
change application boundaries, dependencies, or development workflows.

## 12. Architectural Decision Summary

| Decision                 | Choice                      |
| ------------------------ | --------------------------- |
| Repository architecture  | Monorepo                    |
| Package manager          | npm                         |
| Workspace management     | npm workspaces              |
| Current application      | apps/web                    |
| Future backend           | apps/api                    |
| Shared packages          | packages/                   |
| Lockfile strategy        | One root package-lock.json  |
| Shared tooling           | Repository root             |
| TypeScript configuration | Application-specific        |
| Documentation            | Root docs/                  |
| Deployment               | Independent per application |

This architecture provides ForteFlow with a structured foundation
for full-stack development without introducing unnecessary
complexity at its current stage.
