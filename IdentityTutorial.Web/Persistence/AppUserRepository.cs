using IdentityTutorial.Core.Contracts.Authentication;
using IdentityTutorial.Core.Entities.Authentication;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Metadata.Ecma335;
using System.Threading.Tasks;

namespace IdentityTutorial.Web.Persistence
{
    public class AppUserRepository : IAppUserRepository
    {
      
        private ApplicationDbContext _dbContext;

        public AppUserRepository(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<List<AppUser>> GetAll()
        {
            return await _dbContext.AppUsers.ToListAsync();
        }

        public async Task<AppUser> GetUserByCredentials(string userName, string password)
        {
            return await _dbContext.AppUsers.Include(u => u.UserRole).SingleOrDefaultAsync(u => u.UserName.ToUpper() == userName.ToUpper() && u.Password == password);
        }
    }
}
