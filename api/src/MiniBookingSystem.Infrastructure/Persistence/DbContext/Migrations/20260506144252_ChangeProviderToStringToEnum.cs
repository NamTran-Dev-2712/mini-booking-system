using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MiniBookingSystem.Infrastructure.Persistence.DbContext.Migrations
{
    /// <inheritdoc />
    public partial class ChangeProviderToStringToEnum : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(
                @"
                ALTER TABLE payment_transactions 
                ALTER COLUMN provider TYPE integer 
                USING (
                    CASE 
                        WHEN provider = 'SePay' THEN 1
                        WHEN provider = 'VNPay' THEN 2
                        ELSE 0 
                    END
            );"
            );
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(
                @"
                ALTER TABLE payment_transactions 
                ALTER COLUMN provider TYPE varchar(50)
                USING (
                    CASE 
                        WHEN provider = 1 THEN 'SePay'
                        WHEN provider = 2 THEN 'VNPay'
                        ELSE 'Unknown'
                    END
            );"
            );
        }
    }
}
