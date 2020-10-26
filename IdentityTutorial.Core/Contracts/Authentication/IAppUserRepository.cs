using IdentityTutorial.Core.Entities.Authentication;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace IdentityTutorial.Core.Contracts.Authentication
{
    public interface IAppUserRepository
    {
        Task<AppUser> GetUserByCredentials(string userName, string password);
        Task<List<AppUser>> GetAll();
    }
}
