using IdentityTutorial.Core.Contracts.Authentication;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace IdentityTutorial.Core.Contracts
{
    public interface IUnitOfWork : IDisposable
    {
        //public IAppRoleRepository AppRoleRepository { get; }
        public IAppUserRepository AppUserRepository { get; }
        //public IMovieRepository MovieRepository { get; }
      

        void Save();
        Task<int> SaveChangesAsync();

        void DeleteDatabase();

        void MigrateDatabase();

        void FillDb();
    }
}
