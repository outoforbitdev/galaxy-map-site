using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace GalaxyMapSiteApi.Migrations
{
    /// <inheritdoc />
    public partial class CreateDatabase : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "solar_systems",
                columns: table => new
                {
                    Name = table.Column<string>(type: "text", nullable: false),
                    X = table.Column<int>(type: "integer", nullable: false),
                    Y = table.Column<int>(type: "integer", nullable: false),
                    Sector = table.Column<string>(type: "text", nullable: false),
                    Region = table.Column<string>(type: "text", nullable: false),
                    Focus = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_solar_systems", x => x.Name);
                });

            migrationBuilder.CreateTable(
                name: "spacelanes",
                columns: table => new
                {
                    Name = table.Column<string>(type: "text", nullable: false),
                    OriginId = table.Column<string>(type: "text", nullable: false),
                    DestinationId = table.Column<string>(type: "text", nullable: false),
                    Focus = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.ForeignKey(
                        name: "FK_spacelanes_solar_systems_DestinationId",
                        column: x => x.DestinationId,
                        principalTable: "solar_systems",
                        principalColumn: "Name",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_spacelanes_solar_systems_OriginId",
                        column: x => x.OriginId,
                        principalTable: "solar_systems",
                        principalColumn: "Name",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_spacelanes_DestinationId",
                table: "spacelanes",
                column: "DestinationId");

            migrationBuilder.CreateIndex(
                name: "IX_spacelanes_OriginId",
                table: "spacelanes",
                column: "OriginId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "spacelanes");

            migrationBuilder.DropTable(
                name: "solar_systems");
        }
    }
}
