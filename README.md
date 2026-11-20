# ForteFlow

A business operations management platform built with React, TypeScript, and modern full-stack technologies.

## Project Status

🚧 Active Development

## Overview

ForteFlow is a business operations platform designed to help small businesses and teams manage clients, projects, tasks, invoices, and operational activities from a unified workspace.

The application is being developed as a long-term software engineering project, with an emphasis on maintainable architecture, practical engineering principles, and production-quality implementation.

## Technology Stack

### Frontend

- React
- TypeScript
- Vite
- React Router
- TanStack Query
- Tailwind CSS
- React Hook Form
- Zod
- Recharts
- Lucide React

### Backend and Database

- Supabase
- PostgreSQL

### Testing

- Vitest
- React Testing Library

### Development Tools

- Git
- GitHub
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

## License

MIT License
