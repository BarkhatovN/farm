using Microsoft.EntityFrameworkCore;
using Farm.Data.Entities;

namespace Farm.Data;
public class FarmDbContext : DbContext
{
    public DbSet<Animal> Animals { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder options) =>
            options.UseInMemoryDatabase(databaseName: "farm");

}