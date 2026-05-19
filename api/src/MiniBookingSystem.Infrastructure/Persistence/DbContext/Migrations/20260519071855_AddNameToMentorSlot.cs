using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MiniBookingSystem.Infrastructure.Persistence.DbContext.Migrations
{
    /// <inheritdoc />
    public partial class AddNameToMentorSlot : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "name",
                table: "mentor_slots",
                type: "character varying(200)",
                maxLength: 200,
                nullable: true
            );

            migrationBuilder.Sql(
                "UPDATE mentor_slots SET name = 'Slot ' || TO_CHAR(start_time, 'YYYY-MM-DD HH24:MI') WHERE name IS NULL"
            );

            migrationBuilder.AlterColumn<string>(
                name: "name",
                table: "mentor_slots",
                type: "character varying(200)",
                maxLength: 200,
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "character varying(200)",
                oldNullable: true
            );
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(name: "name", table: "mentor_slots");
        }
    }
}
