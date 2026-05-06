using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MiniBookingSystem.Infrastructure.Persistence.DbContext.Migrations
{
    /// <inheritdoc />
    public partial class AddActiveBookingUniqueConstraint : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(name: "ix_bookings_user_id", table: "bookings");

            migrationBuilder.CreateIndex(
                name: "ix_bookings_user_slot_active_unique",
                table: "bookings",
                columns: new[] { "user_id", "mentor_slot_id" },
                unique: true,
                filter: "status IN (1, 2)"
            );
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "ix_bookings_user_slot_active_unique",
                table: "bookings"
            );

            migrationBuilder.CreateIndex(
                name: "ix_bookings_user_id",
                table: "bookings",
                column: "user_id"
            );
        }
    }
}
