using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MiniBookingSystem.Infrastructure.Persistence.DbContext.Migrations
{
    /// <inheritdoc />
    public partial class UpdateSoftDeleteUser : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "is_deleted",
                table: "users",
                type: "boolean",
                nullable: false,
                defaultValue: false
            );
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(name: "is_deleted", table: "users");
        }
    }
}
