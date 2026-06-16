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

```
mini_booking_system
├─ .actrc
├─ .config
│  └─ dotnet-tools.json
├─ .husky
│  ├─ pre-commit
│  └─ _
│     ├─ applypatch-msg
│     ├─ commit-msg
│     ├─ h
│     ├─ husky.sh
│     ├─ post-applypatch
│     ├─ post-commit
│     ├─ post-merge
│     ├─ post-rewrite
│     ├─ pre-applypatch
│     ├─ pre-auto-gc
│     ├─ pre-commit
│     ├─ pre-merge-commit
│     ├─ pre-push
│     ├─ pre-rebase
│     └─ prepare-commit-msg
├─ api
│  ├─ MiniBookingSystem.slnx
│  ├─ src
│  │  ├─ MiniBookingSystem.Api
│  │  │  ├─ appsettings.json
│  │  │  ├─ Contracts
│  │  │  │  ├─ Common
│  │  │  │  │  ├─ ApiResponse.cs
│  │  │  │  │  └─ BaseApiController.cs
│  │  │  │  └─ Exceptions
│  │  │  │     └─ GlobalExceptionHandler.cs
│  │  │  ├─ Controllers
│  │  │  │  ├─ AiController.cs
│  │  │  │  ├─ AuthController.cs
│  │  │  │  ├─ BookingController.cs
│  │  │  │  ├─ DashboardController.cs
│  │  │  │  ├─ HealthCheckController.cs
│  │  │  │  ├─ MentorController.cs
│  │  │  │  └─ Payment
│  │  │  │     ├─ PaymentController.cs
│  │  │  │     └─ WebhookSepayController.cs
│  │  │  ├─ DependencyInjection.cs
│  │  │  ├─ MiniBookingSystem.Api.csproj
│  │  │  ├─ MiniBookingSystem.Api.http
│  │  │  ├─ Program.cs
│  │  │  └─ Properties
│  │  │     └─ launchSettings.json
│  │  ├─ MiniBookingSystem.Application
│  │  │  ├─ Common
│  │  │  │  ├─ Constants
│  │  │  │  │  ├─ AiConstants.cs
│  │  │  │  │  ├─ ApplicationRoles.cs
│  │  │  │  │  ├─ CacheKeys.cs
│  │  │  │  │  ├─ ConfigurationValue.cs
│  │  │  │  │  ├─ PaginationValue.cs
│  │  │  │  │  ├─ SortOrder.cs
│  │  │  │  │  └─ ValidationPatterns.cs
│  │  │  │  ├─ Handlers
│  │  │  │  │  └─ BaseGetQueryHandler.cs
│  │  │  │  ├─ Localization
│  │  │  │  │  ├─ ILocalizationService.cs
│  │  │  │  │  └─ SharedResource.cs
│  │  │  │  ├─ Models
│  │  │  │  │  ├─ BaseFilterQuery.cs
│  │  │  │  │  └─ TokenResult.cs
│  │  │  │  ├─ Utilities
│  │  │  │  │  ├─ PasswordGenerator.cs
│  │  │  │  │  └─ PhoneNumberNormalizer.cs
│  │  │  │  ├─ Validation
│  │  │  │  │  └─ SocialLinkRuleExtensions.cs
│  │  │  │  └─ ValidationBehavior.cs
│  │  │  ├─ DependecyInjection.cs
│  │  │  ├─ Exceptions
│  │  │  │  ├─ AiServiceException.cs
│  │  │  │  ├─ AppDomainException.cs
│  │  │  │  ├─ BadException.cs
│  │  │  │  ├─ ConflictException.cs
│  │  │  │  ├─ ForbiddenException.cs
│  │  │  │  ├─ NotFoundException.cs
│  │  │  │  └─ UnauthorizedException.cs
│  │  │  ├─ Interfaces
│  │  │  │  ├─ AI
│  │  │  │  │  ├─ IConversationHistoryService.cs
│  │  │  │  │  └─ IMiniMaxService.cs
│  │  │  │  ├─ Cache
│  │  │  │  │  └─ ICacheService.cs
│  │  │  │  ├─ Email
│  │  │  │  │  ├─ IBackgroundJobService.cs
│  │  │  │  │  ├─ IEmailJob.cs
│  │  │  │  │  ├─ IEmailService.cs
│  │  │  │  │  └─ IEmailTemplateService.cs
│  │  │  │  ├─ Files
│  │  │  │  │  └─ IFileStorageService.cs
│  │  │  │  └─ Persistence
│  │  │  │     ├─ IGenericRepository.cs
│  │  │  │     └─ IUnitOfWork.cs
│  │  │  ├─ MiniBookingSystem.Application.csproj
│  │  │  ├─ Modules
│  │  │  │  ├─ Ai
│  │  │  │  │  ├─ Commands
│  │  │  │  │  │  └─ SendAiMessage
│  │  │  │  │  │     ├─ SendAiMessageCommand.cs
│  │  │  │  │  │     └─ SendAiMessageCommandHandler.cs
│  │  │  │  │  ├─ DTOs
│  │  │  │  │  │  ├─ AiChatRequest.cs
│  │  │  │  │  │  ├─ AiChatResponse.cs
│  │  │  │  │  │  └─ ChatMessage.cs
│  │  │  │  │  ├─ Guards
│  │  │  │  │  │  └─ AiInputGuard.cs
│  │  │  │  │  ├─ Prompts
│  │  │  │  │  │  └─ SystemPromptBuilder.cs
│  │  │  │  │  └─ Validators
│  │  │  │  │     └─ SendAiMessageCommandValidator.cs
│  │  │  │  ├─ Auth
│  │  │  │  │  ├─ Commands
│  │  │  │  │  │  ├─ ChangePassword
│  │  │  │  │  │  │  ├─ ChangePasswordCommand.cs
│  │  │  │  │  │  │  └─ ChangePasswordCommandHandler.cs
│  │  │  │  │  │  ├─ CompleteProfile
│  │  │  │  │  │  │  ├─ CompleteProfileCommand.cs
│  │  │  │  │  │  │  └─ CompleteProfileCommandHandler.cs
│  │  │  │  │  │  ├─ ForgotPassword
│  │  │  │  │  │  │  ├─ ForgotPasswordCommand.cs
│  │  │  │  │  │  │  └─ ForgotPasswordCommandHandler.cs
│  │  │  │  │  │  ├─ GoogleLogin
│  │  │  │  │  │  │  ├─ GoogleLoginCommand.cs
│  │  │  │  │  │  │  └─ GoogleLoginCommandHandler.cs
│  │  │  │  │  │  ├─ Login
│  │  │  │  │  │  │  ├─ LoginCommand.cs
│  │  │  │  │  │  │  └─ LoginCommandHandler.cs
│  │  │  │  │  │  ├─ RefreshToken
│  │  │  │  │  │  │  ├─ RefreshTokenCommand.cs
│  │  │  │  │  │  │  └─ RefreshTokenCommandHandler.cs
│  │  │  │  │  │  ├─ Register
│  │  │  │  │  │  │  ├─ RegisterCommand.cs
│  │  │  │  │  │  │  └─ RegisterCommandHandler.cs
│  │  │  │  │  │  ├─ RegisterMentor
│  │  │  │  │  │  │  ├─ RegisterMentorCommand.cs
│  │  │  │  │  │  │  └─ RegisterMentorCommandHandler.cs
│  │  │  │  │  │  ├─ ResetPassword
│  │  │  │  │  │  │  ├─ ResetPasswordCommand.cs
│  │  │  │  │  │  │  └─ ResetPasswordCommandHandler.cs
│  │  │  │  │  │  └─ UpdateProfile
│  │  │  │  │  │     ├─ UpdateProfileCommand.cs
│  │  │  │  │  │     └─ UpdateProfileCommandHandler.cs
│  │  │  │  │  ├─ DTOs
│  │  │  │  │  │  ├─ AuthResultDTO.cs
│  │  │  │  │  │  ├─ ChangePasswordRequest.cs
│  │  │  │  │  │  ├─ CompleteProfileRequest.cs
│  │  │  │  │  │  ├─ UpdateProfileRequest.cs
│  │  │  │  │  │  ├─ UserBasicInfo.cs
│  │  │  │  │  │  ├─ UserDTO.cs
│  │  │  │  │  │  └─ UserTokenData.cs
│  │  │  │  │  ├─ Interfaces
│  │  │  │  │  │  ├─ IIdentityService.cs
│  │  │  │  │  │  ├─ IJwtTokenService.cs
│  │  │  │  │  │  ├─ IPasswordResetTokenRepository.cs
│  │  │  │  │  │  ├─ IRefreshTokenRepository.cs
│  │  │  │  │  │  ├─ ITokenHasher.cs
│  │  │  │  │  │  └─ IUserRepository.cs
│  │  │  │  │  ├─ Queries
│  │  │  │  │  │  └─ GetProfile
│  │  │  │  │  │     ├─ GetProfileQuery.cs
│  │  │  │  │  │     └─ GetProfileQueryHandler.cs
│  │  │  │  │  └─ Validators
│  │  │  │  │     ├─ ChangePasswordValidator.cs
│  │  │  │  │     ├─ CompleteProfileValidator.cs
│  │  │  │  │     ├─ ForgotPasswordValidator.cs
│  │  │  │  │     ├─ LoginValidator.cs
│  │  │  │  │     ├─ RegisterMentorValidator.cs
│  │  │  │  │     ├─ RegisterValidator.cs
│  │  │  │  │     ├─ ResetPasswordValidator.cs
│  │  │  │  │     └─ UpdateProfileValidator.cs
│  │  │  │  ├─ Booking
│  │  │  │  │  ├─ Commands
│  │  │  │  │  │  ├─ CancelBooking
│  │  │  │  │  │  │  ├─ CancelBookingCommand.cs
│  │  │  │  │  │  │  └─ CancelBookingCommandHandler.cs
│  │  │  │  │  │  └─ CreateBooking
│  │  │  │  │  │     ├─ CreateBookingCommand.cs
│  │  │  │  │  │     └─ CreateBookingCommandHandler.cs
│  │  │  │  │  ├─ DTOs
│  │  │  │  │  │  └─ BookingDTO.cs
│  │  │  │  │  ├─ Interfaces
│  │  │  │  │  │  └─ IBookingRepository.cs
│  │  │  │  │  ├─ Queries
│  │  │  │  │  │  ├─ GetAllBookings
│  │  │  │  │  │  │  ├─ GetAllBookingsQuery.cs
│  │  │  │  │  │  │  └─ GetAllBookingsQueryHandler.cs
│  │  │  │  │  │  ├─ GetBookingDetail
│  │  │  │  │  │  │  ├─ GetBookingDetailQuery.cs
│  │  │  │  │  │  │  └─ GetBookingDetailQueryHandler.cs
│  │  │  │  │  │  └─ GetUserBooking
│  │  │  │  │  │     ├─ BookingSortKeys.cs
│  │  │  │  │  │     ├─ GetUserBookingQuery.cs
│  │  │  │  │  │     └─ GetUserBookingQueryHandler.cs
│  │  │  │  │  └─ Validators
│  │  │  │  │     ├─ CancelBookingValidator.cs
│  │  │  │  │     └─ CreateBookingValidator.cs
│  │  │  │  ├─ Dashboard
│  │  │  │  │  ├─ DTOs
│  │  │  │  │  │  ├─ AdminDashboardDTO.cs
│  │  │  │  │  │  ├─ MentorDashboardDTO.cs
│  │  │  │  │  │  ├─ TimeSeriesPoint.cs
│  │  │  │  │  │  └─ UserDashboardDTO.cs
│  │  │  │  │  └─ Queries
│  │  │  │  │     ├─ GetAdminDashboard
│  │  │  │  │     │  ├─ GetAdminDashboardQuery.cs
│  │  │  │  │     │  └─ GetAdminDashboardQueryHandler.cs
│  │  │  │  │     ├─ GetMentorDashboard
│  │  │  │  │     │  ├─ GetMentorDashboardQuery.cs
│  │  │  │  │     │  └─ GetMentorDashboardQueryHandler.cs
│  │  │  │  │     └─ GetUserDashboard
│  │  │  │  │        ├─ GetUserDashboardQuery.cs
│  │  │  │  │        └─ GetUserDashboardQueryHandler.cs
│  │  │  │  ├─ Mentor
│  │  │  │  │  ├─ Commands
│  │  │  │  │  │  ├─ AddSkillMentor
│  │  │  │  │  │  │  ├─ AddSkillMentorCommand.cs
│  │  │  │  │  │  │  └─ AddSkillMentorCommandHandler.cs
│  │  │  │  │  │  ├─ CreateMentor
│  │  │  │  │  │  │  ├─ CreateMentorCommand.cs
│  │  │  │  │  │  │  └─ CreateMentorCommandHandler.cs
│  │  │  │  │  │  ├─ CreateSlotMentor
│  │  │  │  │  │  │  ├─ CreateSlotMentorCommand.cs
│  │  │  │  │  │  │  └─ CreateSlotMentorCommandHandler.cs
│  │  │  │  │  │  ├─ DeleteMentor
│  │  │  │  │  │  │  ├─ DeleteMentorCommand.cs
│  │  │  │  │  │  │  └─ DeleteMentorCommandHandler.cs
│  │  │  │  │  │  ├─ RemoveSkillMentor
│  │  │  │  │  │  │  ├─ RemoveSkillMentorCommand.cs
│  │  │  │  │  │  │  └─ RemoveSkillMentorCommandHandler.cs
│  │  │  │  │  │  ├─ UpdateMentor
│  │  │  │  │  │  │  ├─ UpdateMentorCommand.cs
│  │  │  │  │  │  │  └─ UpdateMentorCommandHandler.cs
│  │  │  │  │  │  ├─ UpdateMentorStatus
│  │  │  │  │  │  │  ├─ UpdateMentorStatusCommand.cs
│  │  │  │  │  │  │  └─ UpdateMentorStatusCommandHandler.cs
│  │  │  │  │  │  └─ UpdateSlotMentor
│  │  │  │  │  │     ├─ UpdateSlotMentorCommand.cs
│  │  │  │  │  │     └─ UpdateSlotMentorCommandHandler.cs
│  │  │  │  │  ├─ DTOs
│  │  │  │  │  │  ├─ MentorDetailDTO.cs
│  │  │  │  │  │  └─ MentorDTO.cs
│  │  │  │  │  ├─ Interfaces
│  │  │  │  │  │  ├─ IMentorRepository.cs
│  │  │  │  │  │  ├─ IMentorSkillRepository.cs
│  │  │  │  │  │  └─ IMentorSlotRepository.cs
│  │  │  │  │  ├─ Queries
│  │  │  │  │  │  ├─ GetMentor
│  │  │  │  │  │  │  ├─ GetMentorQuery.cs
│  │  │  │  │  │  │  ├─ GetMentorQueryHandler.cs
│  │  │  │  │  │  │  └─ MentorSortKeys.cs
│  │  │  │  │  │  └─ GetMentorDetail
│  │  │  │  │  │     ├─ GetMentorDetailHandler.cs
│  │  │  │  │  │     └─ GetMentorDetailQuery.cs
│  │  │  │  │  └─ Validators
│  │  │  │  │     ├─ AddSkillMentorValidator.cs
│  │  │  │  │     ├─ CreateMentorValidator.cs
│  │  │  │  │     ├─ CreateSlotMentorValidator.cs
│  │  │  │  │     ├─ RemoveSkillMentorValidator.cs
│  │  │  │  │     ├─ UpdateMentorSlotValidator.cs
│  │  │  │  │     ├─ UpdateMentorStatusValidator.cs
│  │  │  │  │     └─ UpdateMentorValidator.cs
│  │  │  │  └─ Payment
│  │  │  │     ├─ Commands
│  │  │  │     │  ├─ CreatePayment
│  │  │  │     │  │  ├─ CreatePaymentCommand.cs
│  │  │  │     │  │  └─ CreatePaymentCommandHandler.cs
│  │  │  │     │  └─ ProcessSepayWebhook
│  │  │  │     │     ├─ ProcessSePayWebhookCommand.cs
│  │  │  │     │     └─ ProcessSePayWebhookCommandHandler.cs
│  │  │  │     ├─ DTOs
│  │  │  │     │  ├─ CreatePaymentDTO.cs
│  │  │  │     │  ├─ PaymentStatusDTO.cs
│  │  │  │     │  └─ SePayWebhookRequest.cs
│  │  │  │     ├─ Interfaces
│  │  │  │     │  ├─ IPaymentTransactionRepository.cs
│  │  │  │     │  ├─ IPaymentWebhookLogRepository.cs
│  │  │  │     │  └─ ISepayService.cs
│  │  │  │     ├─ Queries
│  │  │  │     │  └─ GetPaymentStatus
│  │  │  │     │     ├─ GetPaymentStatusQuery.cs
│  │  │  │     │     └─ GetPaymentStatusQueryHandler.cs
│  │  │  │     └─ Validators
│  │  │  │        └─ CreatePaymentValidator.cs
│  │  │  └─ Resources
│  │  │     ├─ SharedResource.resx
│  │  │     └─ SharedResource.vi.resx
│  │  ├─ MiniBookingSystem.Domain
│  │  │  ├─ MiniBookingSystem.Domain.csproj
│  │  │  ├─ Modules
│  │  │  │  ├─ Auth
│  │  │  │  │  ├─ Entities
│  │  │  │  │  │  ├─ PasswordResetToken.cs
│  │  │  │  │  │  └─ RefreshToken.cs
│  │  │  │  │  ├─ Enums
│  │  │  │  │  │  └─ Roles.cs
│  │  │  │  │  ├─ Repositories
│  │  │  │  │  └─ ValueObjects
│  │  │  │  ├─ Booking
│  │  │  │  │  ├─ Entities
│  │  │  │  │  │  └─ Booking.cs
│  │  │  │  │  ├─ Enums
│  │  │  │  │  │  └─ BookingStatus.cs
│  │  │  │  │  ├─ Repositories
│  │  │  │  │  └─ ValueObjects
│  │  │  │  ├─ Mentor
│  │  │  │  │  ├─ Entities
│  │  │  │  │  │  ├─ Mentor.cs
│  │  │  │  │  │  ├─ MentorSkill.cs
│  │  │  │  │  │  └─ MentorSlot.cs
│  │  │  │  │  ├─ Enums
│  │  │  │  │  │  └─ MentorSlotStatus.cs
│  │  │  │  │  ├─ Repositories
│  │  │  │  │  └─ ValueObjects
│  │  │  │  └─ Payments
│  │  │  │     ├─ Entities
│  │  │  │     │  ├─ PaymentTransaction.cs
│  │  │  │     │  └─ PaymentWebhookLog.cs
│  │  │  │     ├─ Enums
│  │  │  │     │  ├─ PaymentProvider.cs
│  │  │  │     │  ├─ PaymentStatus.cs
│  │  │  │     │  └─ PaymentWebhookLogStatus.cs
│  │  │  │     ├─ Repositories
│  │  │  │     └─ ValueObjects
│  │  │  ├─ Primitives
│  │  │  │  ├─ BaseEntity.cs
│  │  │  │  └─ PaginatedResult.cs
│  │  │  └─ System
│  │  │     └─ Entities
│  │  │        ├─ AiConversationLog.cs
│  │  │        └─ SystemSetting.cs
│  │  └─ MiniBookingSystem.Infrastructure
│  │     ├─ DependencyInjection.cs
│  │     ├─ Identity
│  │     │  ├─ ApplicationUser.cs
│  │     │  └─ IdentityService.cs
│  │     ├─ MiniBookingSystem.Infrastructure.csproj
│  │     ├─ Persistence
│  │     │  ├─ Ai
│  │     │  │  ├─ MiniMaxChatRequest.cs
│  │     │  │  ├─ MiniMaxChatResponse.cs
│  │     │  │  └─ MiniMaxOptions.cs
│  │     │  ├─ Cache
│  │     │  │  └─ CacheOptions.cs
│  │     │  ├─ Configurations
│  │     │  │  ├─ Auth
│  │     │  │  │  ├─ ApplicationUserConfiguration.cs
│  │     │  │  │  ├─ PasswordResetTokenConfiguration.cs
│  │     │  │  │  └─ RefreshTokenConfiguration.cs
│  │     │  │  ├─ Bookings
│  │     │  │  │  └─ BookingConfiguration.cs
│  │     │  │  ├─ Mentors
│  │     │  │  │  ├─ MentorConfiguration.cs
│  │     │  │  │  ├─ MentorSkillConfiguration.cs
│  │     │  │  │  └─ MentorSlotConfiguration.cs
│  │     │  │  ├─ Payments
│  │     │  │  │  ├─ PaymentTransactionConfiguration.cs
│  │     │  │  │  └─ PaymentWebhookLogConfiguration.cs
│  │     │  │  └─ System
│  │     │  │     ├─ AiConversationLogConfiguration.cs
│  │     │  │     └─ SystemSettingConfiguration.cs
│  │     │  ├─ DbContext
│  │     │  │  ├─ ApplicationDbContext.cs
│  │     │  │  ├─ DatabaseSeeder.cs
│  │     │  │  ├─ Migrations
│  │     │  │  │  ├─ 20260428072942_InitDatabase.cs
│  │     │  │  │  ├─ 20260428072942_InitDatabase.Designer.cs
│  │     │  │  │  ├─ 20260501170706_UpdateRelationshipMentor.cs
│  │     │  │  │  ├─ 20260501170706_UpdateRelationshipMentor.Designer.cs
│  │     │  │  │  ├─ 20260501183706_UpdateSoftDeleteUser.cs
│  │     │  │  │  ├─ 20260501183706_UpdateSoftDeleteUser.Designer.cs
│  │     │  │  │  ├─ 20260501184906_UpdateFilterPhoneNumber.cs
│  │     │  │  │  ├─ 20260501184906_UpdateFilterPhoneNumber.Designer.cs
│  │     │  │  │  ├─ 20260501190019_AddUserAuditColumns.cs
│  │     │  │  │  ├─ 20260501190019_AddUserAuditColumns.Designer.cs
│  │     │  │  │  ├─ 20260505172509_AddDescriptionAndMaxBookingsToMentorSlot.cs
│  │     │  │  │  ├─ 20260505172509_AddDescriptionAndMaxBookingsToMentorSlot.Designer.cs
│  │     │  │  │  ├─ 20260505180129_AddCurrentBookingsToMentorSlot.cs
│  │     │  │  │  ├─ 20260505180129_AddCurrentBookingsToMentorSlot.Designer.cs
│  │     │  │  │  ├─ 20260505181312_AddExpiresAtToBookings.cs
│  │     │  │  │  ├─ 20260505181312_AddExpiresAtToBookings.Designer.cs
│  │     │  │  │  ├─ 20260505185545_AddActiveBookingUniqueConstraint.cs
│  │     │  │  │  ├─ 20260505185545_AddActiveBookingUniqueConstraint.Designer.cs
│  │     │  │  │  ├─ 20260506144252_ChangeProviderToStringToEnum.cs
│  │     │  │  │  ├─ 20260506144252_ChangeProviderToStringToEnum.Designer.cs
│  │     │  │  │  ├─ 20260518151821_AddPasswordResetTokens.cs
│  │     │  │  │  ├─ 20260518151821_AddPasswordResetTokens.Designer.cs
│  │     │  │  │  ├─ 20260518185420_AddAvatarUrlToUsers.cs
│  │     │  │  │  ├─ 20260518185420_AddAvatarUrlToUsers.Designer.cs
│  │     │  │  │  ├─ 20260519071855_AddNameToMentorSlot.cs
│  │     │  │  │  ├─ 20260519071855_AddNameToMentorSlot.Designer.cs
│  │     │  │  │  ├─ 20260519074845_MakePhoneNumberOptional.cs
│  │     │  │  │  ├─ 20260519074845_MakePhoneNumberOptional.Designer.cs
│  │     │  │  │  ├─ 20260530172227_AddMentorSocialLinksAndSlotLocation.cs
│  │     │  │  │  ├─ 20260530172227_AddMentorSocialLinksAndSlotLocation.Designer.cs
│  │     │  │  │  └─ ApplicationDbContextModelSnapshot.cs
│  │     │  │  └─ Seeds
│  │     │  │     ├─ AdminSeeder.cs
│  │     │  │     ├─ MentorSeeder.cs
│  │     │  │     └─ RoleSeeder.cs
│  │     │  ├─ Email
│  │     │  │  └─ ResendOptions.cs
│  │     │  ├─ GenericRepository.cs
│  │     │  ├─ Payment
│  │     │  │  └─ SepayOptions.cs
│  │     │  ├─ Security
│  │     │  │  └─ JwtOptions.cs
│  │     │  ├─ UnitOfWork.cs
│  │     │  └─ Upload
│  │     │     └─ UploadOptions.cs
│  │     ├─ Repositories
│  │     │  ├─ Auth
│  │     │  │  ├─ PasswordResetTokenRepository.cs
│  │     │  │  ├─ RefreshTokenRepository.cs
│  │     │  │  └─ UserRepository.cs
│  │     │  ├─ Booking
│  │     │  │  └─ BookingRepository.cs
│  │     │  ├─ Mentor
│  │     │  │  ├─ MentorRepository.cs
│  │     │  │  ├─ MentorSkillRepository.cs
│  │     │  │  └─ MentorSlotRepository.cs
│  │     │  └─ Payment
│  │     │     ├─ PaymentRepository.cs
│  │     │     └─ PaymentWebhookLogRepository.cs
│  │     └─ Services
│  │        ├─ Ai
│  │        │  ├─ ConversationHistoryService.cs
│  │        │  └─ MiniMaxService.cs
│  │        ├─ Auth
│  │        │  ├─ JwtTokenService.cs
│  │        │  └─ TokenHasher.cs
│  │        ├─ Background
│  │        │  ├─ CompletedBookingCleanupJob.cs
│  │        │  ├─ ExpiredBookingCleanupJob.cs
│  │        │  └─ RefreshTokenCleanupJob.cs
│  │        ├─ Cache
│  │        │  └─ RedisCacheService.cs
│  │        ├─ Email
│  │        │  ├─ EmailJob.cs
│  │        │  ├─ FluidTemplateService.cs
│  │        │  ├─ HangfireBackgroundJobService.cs
│  │        │  ├─ ResendEmailService.cs
│  │        │  └─ Templates
│  │        │     ├─ admin-welcome.liquid
│  │        │     ├─ mentor-self-welcome.liquid
│  │        │     ├─ mentor-welcome.liquid
│  │        │     └─ password-reset.liquid
│  │        ├─ Localization
│  │        │  └─ LocalizationService.cs
│  │        ├─ Payment
│  │        │  └─ SepayService.cs
│  │        └─ Upload
│  │           └─ LocalFileStorageService.cs
│  └─ tests
│     └─ MiniBookingSystem.UnitTests
│        ├─ Application
│        │  ├─ Auth
│        │  │  ├─ Commands
│        │  │  │  ├─ ChangePasswordCommandHandlerTests.cs
│        │  │  │  ├─ CompleteProfileCommandHandlerTests.cs
│        │  │  │  ├─ ForgotPasswordCommandHandlerTests.cs
│        │  │  │  ├─ GoogleLoginCommandHandlerTests.cs
│        │  │  │  ├─ LoginCommandHandlerTests.cs
│        │  │  │  ├─ RefreshTokenCommandHandlerTests.cs
│        │  │  │  ├─ RegisterCommandHandlerTests.cs
│        │  │  │  ├─ RegisterMentorCommandHandlerTests.cs
│        │  │  │  ├─ ResetPasswordCommandHandlerTests.cs
│        │  │  │  └─ UpdateProfileCommandHandlerTests.cs
│        │  │  ├─ Queries
│        │  │  │  └─ GetProfileQueryHandlerTests.cs
│        │  │  └─ Validators
│        │  │     ├─ ChangePasswordValidatorTests.cs
│        │  │     ├─ CompleteProfileValidatorTests.cs
│        │  │     ├─ LoginValidatorTests.cs
│        │  │     ├─ RegisterMentorValidatorTests.cs
│        │  │     ├─ RegisterValidatorTests.cs
│        │  │     └─ UpdateProfileValidatorTests.cs
│        │  ├─ Booking
│        │  │  ├─ Commands
│        │  │  │  ├─ CancelBookingCommandHandlerTests.cs
│        │  │  │  └─ CreateBookingCommandHandlerTests.cs
│        │  │  ├─ Queries
│        │  │  │  ├─ GetBookingDetailQueryHandlerTests.cs
│        │  │  │  └─ GetUserBookingQueryHandlerTests.cs
│        │  │  └─ Validators
│        │  │     ├─ CancelBookingValidatorTests.cs
│        │  │     └─ CreateBookingValidatorTests.cs
│        │  ├─ Dashboard
│        │  │  └─ Queries
│        │  │     ├─ GetAdminDashboardQueryHandlerTests.cs
│        │  │     ├─ GetMentorDashboardQueryHandlerTests.cs
│        │  │     └─ GetUserDashboardQueryHandlerTests.cs
│        │  ├─ Mentor
│        │  │  ├─ Commands
│        │  │  │  ├─ AddSkillMentorCommandHandlerTests.cs
│        │  │  │  ├─ CreateMentorCommandHandlerTests.cs
│        │  │  │  ├─ CreateSlotMentorCommandHandlerTests.cs
│        │  │  │  ├─ DeleteMentorCommandHandlerTests.cs
│        │  │  │  ├─ RemoveSkillMentorCommandHandlerTests.cs
│        │  │  │  ├─ UpdateMentorCommandHandlerTests.cs
│        │  │  │  ├─ UpdateMentorStatusCommandHandlerTests.cs
│        │  │  │  └─ UpdateSlotMentorCommandHandlerTests.cs
│        │  │  ├─ Queries
│        │  │  │  ├─ GetMentorDetailQueryHandlerTests.cs
│        │  │  │  └─ GetMentorQueryHandlerTests.cs
│        │  │  └─ Validators
│        │  │     ├─ AddSkillMentorValidatorTests.cs
│        │  │     ├─ CreateMentorValidatorTests.cs
│        │  │     ├─ CreateSlotMentorValidatorTests.cs
│        │  │     ├─ UpdateMentorStatusValidatorTests.cs
│        │  │     ├─ UpdateMentorValidatorTests.cs
│        │  │     └─ UpdateSlotMentorValidatorTests.cs
│        │  └─ Payment
│        │     ├─ Commands
│        │     │  ├─ CreatePaymentCommandHandlerTests.cs
│        │     │  └─ ProcessSePayWebhookCommandHandlerTests.cs
│        │     ├─ Queries
│        │     │  └─ GetPaymentStatusQueryHandlerTests.cs
│        │     └─ Validators
│        │        └─ CreatePaymentValidatorTests.cs
│        ├─ Common
│        │  ├─ Builders
│        │  │  ├─ AuthTestData.cs
│        │  │  ├─ BookingTestData.cs
│        │  │  ├─ MentorTestData.cs
│        │  │  └─ PaymentTestData.cs
│        │  └─ Helpers
│        │     ├─ AsyncQueryHelper.cs
│        │     └─ UserManagerMockHelper.cs
│        ├─ GlobalUsings.cs
│        ├─ Infrastructure
│        │  ├─ Identity
│        │  │  └─ IdentityServiceTests.cs
│        │  ├─ Seeds
│        │  │  └─ AdminSeederTests.cs
│        │  └─ Services
│        │     └─ LocalFileStorageServiceTests.cs
│        └─ MiniBookingSystem.UnitTests.csproj
├─ bun.lock
├─ docker-compose.yml
├─ docs
│  ├─ deployment
│  │  └─ production-deployment.md
│  ├─ development
│  │  └─ ef-commands.md
│  ├─ guides
│  │  ├─ google-oauth-flow.md
│  │  ├─ i18n-guide.md
│  │  ├─ local-ci-cd.md
│  │  ├─ payment-flow.md
│  │  └─ testing-guide.md
│  └─ README.md
├─ infra
│  ├─ docker
│  │  ├─ api.Dockerfile
│  │  ├─ nginx
│  │  │  ├─ active-upstream.conf
│  │  │  ├─ conf.d
│  │  │  ├─ nginx.conf
│  │  │  ├─ upstream-blue.conf
│  │  │  └─ upstream-green.conf
│  │  └─ web.Dockerfile
│  ├─ docker-compose.prod.yml
│  ├─ docker-compose.registry.yml
│  └─ scripts
│     ├─ backup-db.sh
│     ├─ deploy.sh
│     ├─ health-check.sh
│     ├─ migrate-db.sh
│     ├─ rollback.sh
│     ├─ setup-registry.sh
│     ├─ setup-ssl.sh
│     └─ setup-vps.sh
├─ LICENSE
├─ package.json
├─ README.md
├─ scripts
│  ├─ act-run.ps1
│  └─ act-run.sh
└─ web
   ├─ .dockerignore
   ├─ app
   │  ├─ app.css
   │  ├─ components
   │  │  ├─ shared
   │  │  │  ├─ avatar-upload.tsx
   │  │  │  ├─ booking
   │  │  │  │  └─ booking-confirm-dialog.tsx
   │  │  │  ├─ command-palette.tsx
   │  │  │  ├─ confirm-dialog.tsx
   │  │  │  ├─ dashboard
   │  │  │  │  ├─ area-chart-card.tsx
   │  │  │  │  ├─ bar-chart-card.tsx
   │  │  │  │  └─ stat-card.tsx
   │  │  │  ├─ data-table
   │  │  │  │  ├─ data-table-column-header.tsx
   │  │  │  │  ├─ data-table-pagination.tsx
   │  │  │  │  ├─ data-table-view-options.tsx
   │  │  │  │  └─ data-table.tsx
   │  │  │  ├─ language-switcher.tsx
   │  │  │  └─ mentor
   │  │  │     ├─ mentor-detail-view.tsx
   │  │  │     ├─ mentor-filter-panel.tsx
   │  │  │     ├─ mentor-list-container.tsx
   │  │  │     ├─ mentor-public-card.tsx
   │  │  │     ├─ mentor-public-grid.tsx
   │  │  │     └─ social-links.tsx
   │  │  └─ ui
   │  │     ├─ alert-dialog.tsx
   │  │     ├─ avatar.tsx
   │  │     ├─ badge.tsx
   │  │     ├─ breadcrumb.tsx
   │  │     ├─ button.tsx
   │  │     ├─ calendar.tsx
   │  │     ├─ card.tsx
   │  │     ├─ chart.tsx
   │  │     ├─ checkbox.tsx
   │  │     ├─ command.tsx
   │  │     ├─ dialog.tsx
   │  │     ├─ dropdown-menu.tsx
   │  │     ├─ form.tsx
   │  │     ├─ input-group.tsx
   │  │     ├─ input.tsx
   │  │     ├─ kbd.tsx
   │  │     ├─ label.tsx
   │  │     ├─ navigation-menu.tsx
   │  │     ├─ pagination.tsx
   │  │     ├─ popover.tsx
   │  │     ├─ scroll-area.tsx
   │  │     ├─ select.tsx
   │  │     ├─ separator.tsx
   │  │     ├─ sheet.tsx
   │  │     ├─ skeleton.tsx
   │  │     ├─ sonner.tsx
   │  │     ├─ switch.tsx
   │  │     ├─ table.tsx
   │  │     ├─ tabs.tsx
   │  │     ├─ textarea.tsx
   │  │     ├─ toggle-group.tsx
   │  │     ├─ toggle.tsx
   │  │     └─ tooltip.tsx
   │  ├─ config
   │  │  ├─ feature-flags.ts
   │  │  └─ languages.ts
   │  ├─ features
   │  │  ├─ admin
   │  │  │  ├─ bookings
   │  │  │  │  └─ bookings.page.tsx
   │  │  │  ├─ dashboard
   │  │  │  │  └─ dashboard.page.tsx
   │  │  │  ├─ health
   │  │  │  │  └─ health.page.tsx
   │  │  │  ├─ mentor
   │  │  │  │  ├─ components
   │  │  │  │  │  ├─ mentor-card-list.tsx
   │  │  │  │  │  ├─ mentor-create-dialog.tsx
   │  │  │  │  │  ├─ mentor-delete-dialog.tsx
   │  │  │  │  │  ├─ mentor-edit-dialog-loader.tsx
   │  │  │  │  │  ├─ mentor-edit-dialog.tsx
   │  │  │  │  │  ├─ mentor-form.tsx
   │  │  │  │  │  ├─ mentor-profile-tab.tsx
   │  │  │  │  │  ├─ mentor-shortcut-help.tsx
   │  │  │  │  │  ├─ mentor-skills-form.tsx
   │  │  │  │  │  ├─ mentor-skills-tab.tsx
   │  │  │  │  │  ├─ mentor-slot-form.tsx
   │  │  │  │  │  ├─ mentor-slots-tab.tsx
   │  │  │  │  │  ├─ mentor-status-dialog.tsx
   │  │  │  │  │  └─ mentor-table-columns.tsx
   │  │  │  │  ├─ lib
   │  │  │  │  │  └─ mentor-filters.ts
   │  │  │  │  ├─ mentor-detail-page.tsx
   │  │  │  │  ├─ mentor-list-page.tsx
   │  │  │  │  └─ schemas
   │  │  │  │     ├─ mentor-skill.schema.ts
   │  │  │  │     ├─ mentor-slot.schema.ts
   │  │  │  │     └─ mentor.schema.ts
   │  │  │  ├─ payments
   │  │  │  │  └─ payments.page.tsx
   │  │  │  └─ profile
   │  │  │     ├─ profile.form.tsx
   │  │  │     ├─ profile.hook.ts
   │  │  │     ├─ profile.page.tsx
   │  │  │     └─ profile.schema.ts
   │  │  ├─ auth
   │  │  │  ├─ change-password
   │  │  │  │  ├─ change-password.form.tsx
   │  │  │  │  ├─ change-password.hook.ts
   │  │  │  │  └─ change-password.schema.ts
   │  │  │  ├─ complete-profile
   │  │  │  │  ├─ complete-profile.form.tsx
   │  │  │  │  ├─ complete-profile.hook.ts
   │  │  │  │  ├─ complete-profile.page.tsx
   │  │  │  │  └─ complete-profile.schema.ts
   │  │  │  ├─ forgot-password
   │  │  │  │  ├─ forgot-password.form.tsx
   │  │  │  │  ├─ forgot-password.hook.ts
   │  │  │  │  ├─ forgot-password.page.tsx
   │  │  │  │  └─ forgot-password.schema.ts
   │  │  │  ├─ login
   │  │  │  │  ├─ login.form.tsx
   │  │  │  │  ├─ login.hook.ts
   │  │  │  │  ├─ login.page.tsx
   │  │  │  │  └─ login.schema.ts
   │  │  │  ├─ register
   │  │  │  │  ├─ register.form.tsx
   │  │  │  │  ├─ register.hook.ts
   │  │  │  │  ├─ register.page.tsx
   │  │  │  │  └─ register.schema.ts
   │  │  │  ├─ reset-password
   │  │  │  │  ├─ reset-password.form.tsx
   │  │  │  │  ├─ reset-password.hook.ts
   │  │  │  │  ├─ reset-password.page.tsx
   │  │  │  │  └─ reset-password.schema.ts
   │  │  │  └─ shared
   │  │  │     └─ social.form.tsx
   │  │  ├─ errors
   │  │  │  └─ unauthorized
   │  │  │     └─ unauthorized.page.tsx
   │  │  ├─ mentor
   │  │  │  ├─ ai-chat
   │  │  │  │  └─ ai-chat.page.tsx
   │  │  │  ├─ bookings
   │  │  │  │  └─ bookings.page.tsx
   │  │  │  ├─ dashboard
   │  │  │  │  └─ dashboard.page.tsx
   │  │  │  ├─ profile
   │  │  │  │  ├─ profile.form.tsx
   │  │  │  │  ├─ profile.hook.ts
   │  │  │  │  ├─ profile.page.tsx
   │  │  │  │  └─ profile.schema.ts
   │  │  │  ├─ schedule
   │  │  │  │  └─ schedule.page.tsx
   │  │  │  └─ skills
   │  │  │     └─ skills.page.tsx
   │  │  ├─ public
   │  │  │  ├─ home
   │  │  │  │  └─ home.page.tsx
   │  │  │  └─ mentors
   │  │  │     └─ mentors.page.tsx
   │  │  └─ user
   │  │     ├─ ai-chat
   │  │     │  └─ ai-chat.page.tsx
   │  │     ├─ booking-detail
   │  │     │  └─ booking-detail.page.tsx
   │  │     ├─ booking-payment
   │  │     │  └─ booking-payment.page.tsx
   │  │     ├─ bookings
   │  │     │  └─ bookings.page.tsx
   │  │     ├─ dashboard
   │  │     │  └─ dashboard.page.tsx
   │  │     ├─ find-mentors
   │  │     │  └─ find-mentors.page.tsx
   │  │     ├─ payments
   │  │     │  └─ payments.page.tsx
   │  │     └─ profile
   │  │        ├─ profile.form.tsx
   │  │        ├─ profile.hook.ts
   │  │        ├─ profile.page.tsx
   │  │        └─ profile.schema.ts
   │  ├─ guards
   │  │  ├─ require-auth.ts
   │  │  └─ require-role.ts
   │  ├─ hooks
   │  │  ├─ auth
   │  │  │  ├─ use-profile-query.ts
   │  │  │  └─ use-update-profile-mutation.ts
   │  │  ├─ booking
   │  │  │  ├─ use-booking-detail-query.ts
   │  │  │  ├─ use-cancel-booking-mutation.ts
   │  │  │  ├─ use-create-booking-mutation.ts
   │  │  │  └─ use-user-bookings-query.ts
   │  │  ├─ dashboard
   │  │  │  ├─ use-admin-dashboard-query.ts
   │  │  │  ├─ use-mentor-dashboard-query.ts
   │  │  │  └─ use-user-dashboard-query.ts
   │  │  ├─ mentor
   │  │  │  ├─ use-add-mentor-skill-mutation.ts
   │  │  │  ├─ use-create-mentor-mutation.ts
   │  │  │  ├─ use-create-mentor-slot-mutation.ts
   │  │  │  ├─ use-delete-mentor-mutation.ts
   │  │  │  ├─ use-mentor-detail-query.ts
   │  │  │  ├─ use-mentors-query.ts
   │  │  │  ├─ use-my-mentor-profile.ts
   │  │  │  ├─ use-remove-mentor-skill-mutation.ts
   │  │  │  ├─ use-update-mentor-mutation.ts
   │  │  │  ├─ use-update-mentor-slot-mutation.ts
   │  │  │  └─ use-update-mentor-status-mutation.ts
   │  │  ├─ payment
   │  │  │  ├─ use-create-payment-mutation.ts
   │  │  │  └─ use-payment-status-query.ts
   │  │  ├─ use-auth.ts
   │  │  ├─ use-command-palette.ts
   │  │  └─ use-upload-avatar.ts
   │  ├─ lib
   │  │  ├─ api-error.ts
   │  │  ├─ axios.config.ts
   │  │  ├─ hotkeys
   │  │  │  ├─ hotkey-scopes.ts
   │  │  │  └─ shortcuts.ts
   │  │  ├─ i18n.ts
   │  │  ├─ mentor-filters.ts
   │  │  ├─ query-client.ts
   │  │  ├─ query-keys.ts
   │  │  └─ utils.ts
   │  ├─ root.tsx
   │  ├─ services
   │  │  ├─ auth
   │  │  │  ├─ auth.service.ts
   │  │  │  └─ dtos
   │  │  │     ├─ commands
   │  │  │     │  ├─ change-password
   │  │  │     │  │  └─ request.ts
   │  │  │     │  ├─ forgot-password
   │  │  │     │  │  └─ request.ts
   │  │  │     │  ├─ login
   │  │  │     │  │  ├─ login.request.ts
   │  │  │     │  │  └─ login.response.ts
   │  │  │     │  ├─ register
   │  │  │     │  │  ├─ register-mentor.request.ts
   │  │  │     │  │  ├─ register-mentor.response.ts
   │  │  │     │  │  ├─ register.request.ts
   │  │  │     │  │  └─ register.response.ts
   │  │  │     │  ├─ reset-password
   │  │  │     │  │  └─ request.ts
   │  │  │     │  └─ update-profile
   │  │  │     │     └─ update-profile.request.ts
   │  │  │     └─ queries
   │  │  │        └─ profile
   │  │  │           └─ profile.response.ts
   │  │  ├─ booking
   │  │  │  └─ booking.service.ts
   │  │  ├─ dashboard
   │  │  │  ├─ dashboard.service.ts
   │  │  │  └─ dashboard.types.ts
   │  │  ├─ file
   │  │  │  └─ file.service.ts
   │  │  ├─ mentor
   │  │  │  ├─ dtos
   │  │  │  │  ├─ commands
   │  │  │  │  │  ├─ add-skill
   │  │  │  │  │  │  ├─ request.ts
   │  │  │  │  │  │  └─ response.ts
   │  │  │  │  │  ├─ create-mentor
   │  │  │  │  │  │  ├─ request.ts
   │  │  │  │  │  │  └─ response.ts
   │  │  │  │  │  ├─ create-slot
   │  │  │  │  │  │  ├─ request.ts
   │  │  │  │  │  │  └─ response.ts
   │  │  │  │  │  ├─ update-mentor
   │  │  │  │  │  │  ├─ request.ts
   │  │  │  │  │  │  └─ response.ts
   │  │  │  │  │  ├─ update-mentor-status
   │  │  │  │  │  │  ├─ request.ts
   │  │  │  │  │  │  └─ response.ts
   │  │  │  │  │  └─ update-slot
   │  │  │  │  │     ├─ request.ts
   │  │  │  │  │     └─ response.ts
   │  │  │  │  └─ queries
   │  │  │  │     ├─ get-mentor-detail
   │  │  │  │     │  └─ response.ts
   │  │  │  │     └─ get-mentors
   │  │  │  │        ├─ request.ts
   │  │  │  │        └─ response.ts
   │  │  │  └─ mentor.service.ts
   │  │  └─ payment
   │  │     └─ payment.service.ts
   │  ├─ stores
   │  │  └─ auth.store.ts
   │  └─ types
   │     ├─ booking
   │     │  └─ booking.ts
   │     ├─ global
   │     │  ├─ api.response.ts
   │     │  ├─ env.d.ts
   │     │  └─ paginated.ts
   │     ├─ mentor
   │     │  └─ mentor.ts
   │     └─ payment
   │        └─ payment.ts
   ├─ bun.lock
   ├─ components.json
   ├─ Dockerfile
   ├─ package.json
   ├─ public
   │  ├─ favicon.ico
   │  └─ locales
   │     ├─ en
   │     │  ├─ auth.json
   │     │  ├─ booking.json
   │     │  ├─ common.json
   │     │  ├─ dashboard.json
   │     │  ├─ mentor.json
   │     │  ├─ payment.json
   │     │  └─ public.json
   │     └─ vi
   │        ├─ auth.json
   │        ├─ booking.json
   │        ├─ common.json
   │        ├─ dashboard.json
   │        ├─ mentor.json
   │        ├─ payment.json
   │        └─ public.json
   ├─ README.md
   ├─ tsconfig.json
   └─ vite.config.ts

```