using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MiniBookingSystem.Infrastructure.Persistence.DbContext.Migrations
{
    /// <inheritdoc />
    public partial class AddExpiresAtToBookings : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "expires_at",
                table: "bookings",
                type: "timestamp with time zone",
                nullable: false,
                defaultValueSql: "CURRENT_TIMESTAMP + INTERVAL '15 minutes'"
            );
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(name: "expires_at", table: "bookings");
        }
    }
}
