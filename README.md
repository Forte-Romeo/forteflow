# ForteFlow

A business operations management platform built with React, TypeScript, and modern full-stack technologies.

## Project Status

🚧 Active Development

## Overview

ForteFlow is a business operations platform designed to help small businesses and teams manage clients, projects, tasks, invoices, and operational activities from a unified workspace.

The application is being developed as a long-term software engineering project, with an emphasis on maintainable architecture, practical engineering principles, and production-quality implementation.

The current implementation focuses on the frontend application and
its core interface foundations. Authentication interactions and
dashboard data currently use demonstration logic and mock data.
The backend API, database integration, and real authentication
system will be introduced in subsequent development phases.

## Technology Stack

### Frontend — Current

- React
- TypeScript
- Vite
- React Router
- Tailwind CSS
- React Hook Form
- Zod
- Recharts
- Lucide React

### Backend and Database — Planned

- Node.js
- Express
- TypeScript
- PostgreSQL
- node-postgres (`pg`)
- node-pg-migrate
- Zod
- Pino

### Testing — Planned

Frontend:

- Vitest
- React Testing Library

Backend:

- Vitest
- Supertest

### Development Tools

- Git
- GitHub
- npm Workspaces
- ESLint
- Prettier

## Planned Features

- User authentication and authorization
- Business analytics dashboard
- Client relationship management
- Project management
- Task management
- Invoice management
- Notifications
- Global search
- User and workspace settings
- Responsive application interface

## Repository Architecture

ForteFlow is organized as an npm workspaces monorepo.

```text
forteflow/
├── apps/
│   └── web/          # React frontend
├── packages/         # Shared packages
├── docs/             # Project documentation
├── .github/          # GitHub configuration
├── package.json
└── package-lock.json
```

### Applications

| Application | Description                   | Status  |
| ----------- | ----------------------------- | ------- |
| `apps/web`  | React and TypeScript frontend | Active  |
| `apps/api`  | Node.js backend API           | Planned |

### Shared Packages

The `packages/` directory is reserved for reusable packages that
may be shared between applications.

## Getting Started

### Prerequisites

- Node.js
- npm

### Installation

Clone the repository and install dependencies from its root:

```bash
npm install
```

### Development

Start the web application:

```bash
npm run dev
```

### Production Build

```bash
npm run build
```

### Quality Checks

```bash
npm run lint
npm run format:check
```

## Documentation

Detailed architectural decisions and repository conventions are
documented in:

- [Monorepo Architecture](docs/architecture/monorepo-architecture.md)

## Development Philosophy

The project is developed incrementally, with emphasis on:

- Clean and maintainable code
- Separation of concerns
- Type safety
- Reusable components
- Accessible user interfaces
- Testing and reliability
- Secure application design
- Clear Git history
- Technical documentation

## Developer Documentation

- [Backend Setup and Usage](apps/api/README.md)
- [Backend Architecture](docs/architecture/backend-architecture.md)

## License

MIT License
