using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using IdentityTutorial.Core.Contracts;
using IdentityTutorial.Core.Contracts.Authentication;
using IdentityTutorial.Core.Entities.Authentication;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace IdentityTutorial.Web.Persistence
{

    public class UnitOfWork : IUnitOfWork
    {
        private readonly ApplicationDbContext _dbContext;
        private bool _disposed;



        public IAppUserRepository AppUserRepository { get; }


        public UnitOfWork(IConfiguration configuration)
        {
            _dbContext = new ApplicationDbContext(configuration);

            AppUserRepository = new AppUserRepository(_dbContext);

        }


        /// <summary>
        ///     Repository-übergreifendes Speichern der Änderungen
        /// </summary>
        public void Save()
        {
            var entities = _dbContext.ChangeTracker.Entries()
               .Where(entity => entity.State == EntityState.Added
                                || entity.State == EntityState.Modified)
               .Select(e => e.Entity);
            foreach (var entity in entities)
            {
                ValidateEntity(entity);
            }
            _dbContext.SaveChanges();
        }

        public Task<int> SaveChangesAsync()
        {
            var entities = _dbContext.ChangeTracker.Entries()
                .Where(entity => entity.State == EntityState.Added
                                 || entity.State == EntityState.Modified)
                .Select(e => e.Entity);
            foreach (var entity in entities)
            {
                ValidateEntity(entity);
            }
            return _dbContext.SaveChangesAsync();
        }



        /// <summary>
        /// Validierungen auf DbContext-Ebene
        /// </summary>
        /// <param name="entity"></param>
        private void ValidateEntity(object entity)
        {

        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        protected virtual void Dispose(bool disposing)
        {
            if (!_disposed)
            {
                if (disposing)
                {
                    _dbContext.Dispose();
                }
            }
            _disposed = true;
        }

        public void DeleteDatabase()
        {
            _dbContext.Database.EnsureDeleted();
        }

        public void MigrateDatabase()
        {
            _dbContext.Database.Migrate();
        }

        public void FillDb()
        {

            DeleteDatabase();
            MigrateDatabase();

            var adminRole = new AppRole() { Role = "Admin" };
            var userRole = new AppRole() { Role = "User" };
            _dbContext.AppRoles.Add(adminRole);
            _dbContext.AppRoles.Add(userRole);

            _dbContext.AppUsers.AddRange(
            new AppUser { FirstName = "Standard", LastName = "Admin", UserName = "admin", Password = "8C6976E5B5410415BDE908BD4DEE15DFB167A9C873FC4BB8A81F6F2AB448A918", UserRole = adminRole },//Password = admin
            new AppUser { FirstName = "Standard", LastName = "User", UserName = "user", Password = "04F8996DA763B7A969B1028EE3007569EAF3A635486DDAB211D512C85B9DF8FB", UserRole = userRole }); //Password = user

            _dbContext.SaveChanges();
        }
    }
}

