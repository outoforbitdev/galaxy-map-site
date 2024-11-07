using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace GalaxyMapSiteApi.Migrations
{
    /// <inheritdoc />
    public partial class Spacelanes : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Spacelanes",
                columns: table => new
                {
                    Name = table.Column<string>(type: "text", nullable: false),
                    OriginId = table.Column<string>(type: "text", nullable: false),
                    DestinationId = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.ForeignKey(
                        name: "FK_Spacelanes_Systems_DestinationId",
                        column: x => x.DestinationId,
                        principalTable: "Systems",
                        principalColumn: "Name",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Spacelanes_Systems_OriginId",
                        column: x => x.OriginId,
                        principalTable: "Systems",
                        principalColumn: "Name",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Spacelanes_DestinationId",
                table: "Spacelanes",
                column: "DestinationId");

            migrationBuilder.CreateIndex(
                name: "IX_Spacelanes_OriginId",
                table: "Spacelanes",
                column: "OriginId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Spacelanes");
        }
    }
}
