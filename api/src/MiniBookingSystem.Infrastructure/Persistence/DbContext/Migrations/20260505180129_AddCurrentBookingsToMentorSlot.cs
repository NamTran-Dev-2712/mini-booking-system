using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MiniBookingSystem.Infrastructure.Persistence.DbContext.Migrations
{
    /// <inheritdoc />
    public partial class AddCurrentBookingsToMentorSlot : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "current_bookings",
                table: "mentor_slots",
                type: "integer",
                nullable: false,
                defaultValue: 0
            );
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(name: "current_bookings", table: "mentor_slots");
        }
    }
}
