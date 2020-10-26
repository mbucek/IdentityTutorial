using IdentityTutorial.Core.Entities.Authentication;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IdentityTutorial.Web.Persistence
{
    public class ApplicationDbContext: DbContext
    {
        public DbSet<AppUser> AppUsers { get; set; }
        public DbSet<AppRole> AppRoles { get; set; }
        

        IConfiguration _config;

        public ApplicationDbContext(IConfiguration configuration) : base()
        {
            _config = configuration;
        }

        public ApplicationDbContext()
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(Environment.CurrentDirectory).AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
                                                          .AddJsonFile($"appsettings.{Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT")}.json", optional: true, reloadOnChange: true);

            _config = builder.Build();
        }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            string connectionString = Microsoft
                 .Extensions
                 .Configuration
                 .ConfigurationExtensions
             .GetConnectionString(_config, "DefaultConnection");    //Works with azure settings

            optionsBuilder.UseSqlServer(connectionString);


        }
    }
}
