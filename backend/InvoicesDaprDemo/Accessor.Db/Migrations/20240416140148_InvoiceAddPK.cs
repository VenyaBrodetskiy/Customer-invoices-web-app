using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Accessor.Db.Migrations
{
    /// <inheritdoc />
    public partial class InvoiceAddPK : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Status",
                table: "invoices",
                newName: "status");

            migrationBuilder.RenameColumn(
                name: "Amount",
                table: "invoices",
                newName: "amount");

            migrationBuilder.RenameColumn(
                name: "DateIssued",
                table: "invoices",
                newName: "date_issued");

            migrationBuilder.AlterColumn<string>(
                name: "status",
                table: "invoices",
                type: "nvarchar(50)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Invoices",
                table: "invoices",
                column: "id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_Invoices",
                table: "invoices");

            migrationBuilder.RenameColumn(
                name: "status",
                table: "invoices",
                newName: "Status");

            migrationBuilder.RenameColumn(
                name: "amount",
                table: "invoices",
                newName: "Amount");

            migrationBuilder.RenameColumn(
                name: "date_issued",
                table: "invoices",
                newName: "DateIssued");

            migrationBuilder.AlterColumn<string>(
                name: "Status",
                table: "invoices",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(50)");
        }
    }
}
