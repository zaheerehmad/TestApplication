using Microsoft.EntityFrameworkCore;
using TestApplication.Data.Entities;


namespace TestApplication.Data
{
    public class DBContext : DbContext
    {
        public DbSet<Accounts> Accounts { get; set; }
        public DbSet<QueueGroup> QueueGroups { get; set; }
        public DbSet<MonitorData> MonitorData { get; set; }

        public DBContext(DbContextOptions<DBContext> options)
           : base(options)
        {
            Accounts.AddRange(Seeder.GetModel<Accounts>(@"Data\Account.json"));
            QueueGroups.AddRange(Seeder.GetModel<QueueGroup>(@"Data\QueueGroup.json"));
            MonitorData.AddRange(Seeder.GetModel<MonitorData>(@"Data\MonitorData.json"));            
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {           
            modelBuilder.Entity<QueueGroup>()
                .HasMany(qGroup => qGroup.MonitorData)
                .WithOne(md => md.QueueGroup)
                .HasForeignKey(fk => fk.QueueGroupID);
        }
    }
}
