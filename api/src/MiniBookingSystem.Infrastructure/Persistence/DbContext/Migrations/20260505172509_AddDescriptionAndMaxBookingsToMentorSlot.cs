using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MiniBookingSystem.Infrastructure.Persistence.DbContext.Migrations
{
    /// <inheritdoc />
    public partial class AddDescriptionAndMaxBookingsToMentorSlot : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "description",
                table: "mentor_slots",
                type: "character varying(1000)",
                maxLength: 1000,
                nullable: true
            );

            migrationBuilder.AddColumn<int>(
                name: "max_bookings",
                table: "mentor_slots",
                type: "integer",
                nullable: true,
                defaultValue: 0
            );

            migrationBuilder.Sql(
                "UPDATE mentor_slots SET max_bookings = 1 WHERE max_bookings IS NULL"
            );

            migrationBuilder.AlterColumn<int>(
                name: "max_bookings",
                table: "mentor_slots",
                type: "integer",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "integer",
                oldNullable: true
            );
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(name: "description", table: "mentor_slots");

            migrationBuilder.DropColumn(name: "max_bookings", table: "mentor_slots");
        }
    }
}
