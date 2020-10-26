using IdentityTutorial.Core.Entities.Authentication;
using IdentityTutorial.Web.Persistence;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace IdentityTutorial.ConsoleFillDb
{
    class Program
    {
        static async Task Main(string[] args)
        {
            Console.WriteLine("Datenbank wird neue erstellt!");

            var builder = new ConfigurationBuilder()
                .SetBasePath(Environment.CurrentDirectory).AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
                                                          .AddJsonFile($"appsettings.{Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT")}.json", optional: true, reloadOnChange: true);

            var configuration = builder.Build();

            using (UnitOfWork uow = new UnitOfWork(configuration))
            {
                Console.Clear();
                Console.WriteLine("Datenbank wird neu erstellt.....");
                uow.FillDb();

                List<AppUser> users = await uow.AppUserRepository.GetAll();
                Console.WriteLine("Angelegte Benutzer:");
                foreach (var user in users)
                {
                    Console.WriteLine(user.UserName);
                }
            }

            Console.ReadKey();
        }
    }
}
