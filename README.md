# Mini Booking System

A full-stack mentor/tutor booking platform that connects students with experienced mentors. Students can discover mentors, book sessions, and pay via QR bank transfer. Mentors manage their schedules, skills, and bookings. Admins oversee the entire system with dashboards and health monitoring.

## Features

- **Authentication** — JWT with httpOnly cookies, refresh token rotation, Google OAuth 2.0
- **Mentor Discovery** — Browse, filter, and search mentors by category, skills, and rating
- **Session Booking** — Real-time slot availability, booking lifecycle management
- **QR Payment** — SePay bank transfer integration with automatic webhook confirmation
- **Admin Dashboard** — System health monitoring, user/booking/payment management
- **Email Notifications** — Transactional emails via Resend (welcome, password reset)
- **Background Jobs** — Expired booking cleanup, completed session marking, token pruning
- **Multi-language** — English and Vietnamese (i18n) with runtime language switching
- **Blue-Green Deployment** — Zero-downtime deploys with automatic rollback

## Tech Stack

### Backend

| Layer | Technology |
|-------|-----------|
| Framework | .NET 10 / ASP.NET Core |
| Architecture | Clean Architecture (Api → Application → Domain ← Infrastructure) |
| CQRS | MediatR + FluentValidation pipeline |
| Database | PostgreSQL 15 + Entity Framework Core 10 |
| Auth | ASP.NET Core Identity + JWT Bearer |
| Cache | Redis 7 (distributed cache, rate limiting, output cache) |
| Background Jobs | Hangfire (Redis storage) |
| Logging | Serilog (structured JSON, rolling files) |
| Email | Resend + Fluid templates |
| AI | MiniMax API integration |

### Frontend

| Layer | Technology |
|-------|-----------|
| Framework | React 19 + React Router 7 (SSR) |
| Language | TypeScript 5.9 (strict mode) |
| Server State | TanStack Query v5 |
| Client State | Zustand v5 (persisted) |
| UI Components | shadcn/ui + Radix UI |
| Styling | Tailwind CSS v4 |
| i18n | react-i18next + i18next |
| Forms | React Hook Form + Zod |
| Package Manager | Bun |

### Infrastructure

| Component | Technology |
|-----------|-----------|
| Containers | Docker + Docker Compose |
| CI/CD | GitHub Actions |
| Registry | GitHub Container Registry (GHCR) |
| Reverse Proxy | nginx (TLS termination, rate limiting) |
| SSL | Let's Encrypt (certbot auto-renewal) |
| Deployment | Blue-green with health checks and auto-rollback |

## Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    Presentation Layer                     │
│              (Controllers, Middleware, DI)                │
├─────────────────────────────────────────────────────────┤
│                    Application Layer                      │
│         (Commands, Queries, Validators, DTOs)            │
├─────────────────────────────────────────────────────────┤
│                      Domain Layer                         │
│        (Entities, Value Objects, Repositories)           │
├─────────────────────────────────────────────────────────┤
│                   Infrastructure Layer                    │
│    (EF Core, Identity, Redis, External Services)         │
└─────────────────────────────────────────────────────────┘
```

Dependencies flow inward — Infrastructure and Presentation depend on Application and Domain, but Domain has zero external dependencies.

## Prerequisites

- [.NET 10 SDK](https://dotnet.microsoft.com/download)
- [Node.js 20+](https://nodejs.org/) (for SSR runtime)
- [Bun](https://bun.sh/) (package manager and build tool)
- [PostgreSQL 15+](https://www.postgresql.org/)
- [Redis 7+](https://redis.io/)
- [Docker](https://www.docker.com/) (optional, for containerized development)

## Getting Started

### 1. Clone the repository

```bash
git clone <repository-url>
cd mini_booking_system
```

### 2. Start infrastructure services

```bash
docker compose up -d
```

This starts PostgreSQL and Redis with default dev credentials.

### 3. Run the backend

```bash
cd api
dotnet restore MiniBookingSystem.slnx
dotnet run --project src/MiniBookingSystem.Api
```

The API starts at `http://localhost:5296`. Swagger/Scalar docs available at `/scalar/v1` in development.

### 4. Run the frontend

```bash
cd web
bun install
bun run dev
```

The web app starts at `http://localhost:5173`.

## Environment Configuration

### Backend (`api/src/MiniBookingSystem.Api/appsettings.json`)

| Section | Purpose |
|---------|---------|
| `ConnectionStrings:DefaultConnection` | PostgreSQL connection |
| `JwtSettings` | JWT secret, issuer, audience, token expiry |
| `Redis` | Connection string, instance name, TTL |
| `Google` | OAuth client ID and secret |
| `Resend` | Email API key, sender address |
| `SePay` | Payment provider credentials |
| `MiniMax` | AI service API key |
| `AdminSettings:Email` | Auto-created admin account email |

### Frontend (`web/.env`)

| Variable | Purpose |
|----------|---------|
| `VITE_API_URL` | Backend API base URL |

### Production

Production secrets are managed via GitHub Secrets and injected as environment variables during deployment. See [Production Deployment Guide](docs/deployment/production-deployment.md) for the full list.

## Testing

### Backend

```bash
dotnet test api/MiniBookingSystem.slnx -c Release
```

Tests use xUnit, Moq, and FluentAssertions. Test data builders are in `tests/Common/Builders/`.

### Frontend

```bash
cd web
bun run typecheck
```

## Deployment

The project uses GitHub Actions for CI/CD:

1. **CI** (on PR) — Runs backend tests, frontend typecheck, and Docker build verification
2. **CD** (on push to main) — Builds images, pushes to GHCR, deploys via blue-green strategy

Deployment target is a self-managed VPS with Docker Compose, nginx for TLS termination, and Let's Encrypt for SSL certificates.

See [Production Deployment Guide](docs/deployment/production-deployment.md) for complete setup instructions.

## Project Structure

```
mini_booking_system/
├── api/                          # Backend (.NET 10)
│   ├── src/
│   │   ├── MiniBookingSystem.Api/           # Presentation layer
│   │   ├── MiniBookingSystem.Application/   # Business logic (CQRS)
│   │   ├── MiniBookingSystem.Domain/        # Domain entities
│   │   └── MiniBookingSystem.Infrastructure/# Data access, external services
│   └── tests/
│       └── MiniBookingSystem.UnitTests/     # Unit tests
├── web/                          # Frontend (React 19 + React Router 7)
│   ├── app/
│   │   ├── components/          # UI components (layouts, shared, ui)
│   │   ├── config/              # Feature flags, language config
│   │   ├── features/            # Feature modules (forms, schemas)
│   │   ├── guards/              # Route guards (auth, role)
│   │   ├── hooks/               # TanStack Query hooks
│   │   ├── lib/                 # Utilities (axios, i18n, query-client)
│   │   ├── routes/              # Route components (public, auth, user, mentor, admin)
│   │   ├── services/            # API service layer (CQRS DTOs)
│   │   ├── stores/              # Zustand stores
│   │   └── types/               # TypeScript type definitions
│   └── public/
│       └── locales/             # i18n translation files (en, vi)
├── infra/                        # Infrastructure
│   ├── docker/                  # Dockerfiles, nginx config
│   ├── scripts/                 # Deploy, rollback, backup scripts
│   └── docker-compose.prod.yml  # Production compose
├── docs/                         # Documentation
│   ├── deployment/              # Production deployment guide
│   ├── guides/                  # Feature integration guides
│   └── development/             # Dev notes and commands
├── .github/workflows/            # CI/CD pipelines
├── docker-compose.yml            # Local dev infrastructure
└── README.md                     # This file
```

## Documentation

See [docs/](./docs/) for detailed guides:

- [Production Deployment](docs/deployment/production-deployment.md)
- [Google OAuth Flow](docs/guides/google-oauth-flow.md)
- [Payment Flow](docs/guides/payment-flow.md)
- [Testing Guide](docs/guides/testing-guide.md)
- [EF Core Commands](docs/development/ef-commands.md)

## Contributing

1. Create a feature branch from `main`
2. Make your changes following existing patterns
3. Ensure all tests pass: `dotnet test api/MiniBookingSystem.slnx`
4. Ensure frontend typechecks: `cd web && bun run typecheck`
5. Open a pull request — CI will run automatically

### Code Quality

- Pre-commit hooks enforce formatting (Prettier for TS, CSharpier for C#)
- Backend follows Clean Architecture with CQRS pattern
- Frontend follows feature-sliced architecture with role-segmented routes
- All API endpoints require unit tests

## License

See [LICENSE](./LICENSE) for details.
