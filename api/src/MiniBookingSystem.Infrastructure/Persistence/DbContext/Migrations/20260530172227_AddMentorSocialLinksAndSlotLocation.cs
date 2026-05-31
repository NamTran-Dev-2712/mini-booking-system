using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MiniBookingSystem.Infrastructure.Persistence.DbContext.Migrations
{
    /// <inheritdoc />
    public partial class AddMentorSocialLinksAndSlotLocation : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "facebook_url",
                table: "mentors",
                type: "character varying(500)",
                maxLength: 500,
                nullable: true
            );

            migrationBuilder.AddColumn<string>(
                name: "github_url",
                table: "mentors",
                type: "character varying(500)",
                maxLength: 500,
                nullable: true
            );

            migrationBuilder.AddColumn<string>(
                name: "linked_in_url",
                table: "mentors",
                type: "character varying(500)",
                maxLength: 500,
                nullable: true
            );

            migrationBuilder.AddColumn<string>(
                name: "telegram_url",
                table: "mentors",
                type: "character varying(500)",
                maxLength: 500,
                nullable: true
            );

            migrationBuilder.AddColumn<string>(
                name: "website_url",
                table: "mentors",
                type: "character varying(500)",
                maxLength: 500,
                nullable: true
            );

            migrationBuilder.AddColumn<string>(
                name: "location",
                table: "mentor_slots",
                type: "character varying(500)",
                maxLength: 500,
                nullable: true
            );
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(name: "facebook_url", table: "mentors");

            migrationBuilder.DropColumn(name: "github_url", table: "mentors");

            migrationBuilder.DropColumn(name: "linked_in_url", table: "mentors");

            migrationBuilder.DropColumn(name: "telegram_url", table: "mentors");

            migrationBuilder.DropColumn(name: "website_url", table: "mentors");

            migrationBuilder.DropColumn(name: "location", table: "mentor_slots");
        }
    }
}
