# Migration
`dotnet ef migrations add <name> --project src/MiniBookingSystem.Infrastructure/MiniBookingSystem.Infrastructure.csproj --startup-project src/MiniBookingSystem.Api/MiniBookingSystem.Api.csproj --output-dir Persistence/DbContext/Migrations`

# Update Database
`dotnet ef database update --project src/MiniBookingSystem.Infrastructure/MiniBookingSystem.Infrastructure.csproj --startup-project src/MiniBookingSystem.Api/MiniBookingSystem.Api.csproj`
