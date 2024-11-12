using Microsoft.EntityFrameworkCore;

namespace GalaxyMapSiteApi.Data;

public class GalaxyMapContext : DbContext {
    public GalaxyMapContext(DbContextOptions<GalaxyMapContext> options) : base(options) { }
    public DbSet<Models.System> Systems { get; set;}
    public DbSet<Models.Spacelane> Spacelanes { get; set;}

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Models.System>()
            .HasKey(s => s.Name);
        modelBuilder.Entity<Models.Spacelane>()
            .HasOne(s => s.Origin)
            .WithMany()
            .HasForeignKey(s => s.OriginId)
            .IsRequired();
        modelBuilder.Entity<Models.Spacelane>()
            .HasOne(s => s.Destination)
            .WithMany()
            .HasForeignKey(s => s.DestinationId)
            .IsRequired();
        modelBuilder.Entity<Models.Spacelane>()
            .HasNoKey();
    }

}