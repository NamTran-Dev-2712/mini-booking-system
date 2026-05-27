# ============================================================
# Stage 1: Restore dependencies (cached layer)
# ============================================================
FROM mcr.microsoft.com/dotnet/sdk:10.0 AS restore
WORKDIR /src

COPY api/MiniBookingSystem.slnx ./
COPY api/src/MiniBookingSystem.Api/MiniBookingSystem.Api.csproj src/MiniBookingSystem.Api/
COPY api/src/MiniBookingSystem.Application/MiniBookingSystem.Application.csproj src/MiniBookingSystem.Application/
COPY api/src/MiniBookingSystem.Domain/MiniBookingSystem.Domain.csproj src/MiniBookingSystem.Domain/
COPY api/src/MiniBookingSystem.Infrastructure/MiniBookingSystem.Infrastructure.csproj src/MiniBookingSystem.Infrastructure/
COPY api/tests/MiniBookingSystem.UnitTests/MiniBookingSystem.UnitTests.csproj tests/MiniBookingSystem.UnitTests/

RUN dotnet restore MiniBookingSystem.slnx

# ============================================================
# Stage 2: Build, test, and publish
# ============================================================
FROM restore AS build
WORKDIR /src

COPY api/ ./

RUN dotnet build MiniBookingSystem.slnx -c Release --no-restore

RUN dotnet test MiniBookingSystem.slnx -c Release --no-build --verbosity minimal

RUN dotnet publish src/MiniBookingSystem.Api/MiniBookingSystem.Api.csproj \
    -c Release \
    --no-build \
    -o /app/publish

# ============================================================
# Stage 3: Runtime
# ============================================================
FROM mcr.microsoft.com/dotnet/aspnet:10.0-alpine AS runtime
WORKDIR /app

RUN apk add --no-cache curl icu-libs

RUN addgroup -S appgroup && adduser -S appuser -G appgroup

COPY --from=build /app/publish .

RUN mkdir -p /app/uploads/avatars /app/logs && \
    chown -R appuser:appgroup /app/uploads /app/logs

USER appuser

EXPOSE 8080
ENV ASPNETCORE_URLS=http://+:8080
ENV ASPNETCORE_ENVIRONMENT=Production
ENV DOTNET_SYSTEM_GLOBALIZATION_INVARIANT=false

HEALTHCHECK --interval=15s --timeout=5s --start-period=60s --retries=3 \
    CMD curl -f http://localhost:8080/health || exit 1

ENTRYPOINT ["dotnet", "MiniBookingSystem.Api.dll"]
