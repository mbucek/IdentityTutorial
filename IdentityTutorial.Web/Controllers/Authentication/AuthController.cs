using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using IdentityTutorial.Core.Contracts;
using IdentityTutorial.Core.Entities.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace IdentityTutorial.Web.Controllers.Authentication
{

    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IConfiguration _config;
        private IUnitOfWork _unitOfWork;

        public AuthController(IConfiguration config, IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
            _config = config;
        }

        [HttpPost("login")]
        [AllowAnonymous]
        public async Task<IActionResult> Login([FromBody] AppUser login)
        {
            //IActionResult response = Unauthorized();
            AppUser user = await AuthenticateUser(login);
            if (user != null)
            {
                var tokenString = GenerateJWTToken(user);
                IActionResult response = Ok(new
                {
                    auth_token = tokenString,
                    userDetails = user,
                });
                return response; //Login successfull
            }
            return Ok(null); //Login failed
        }
        async Task<AppUser> AuthenticateUser(AppUser loginCredentials)
        {
            AppUser user = await _unitOfWork.AppUserRepository.GetUserByCredentials(loginCredentials.UserName, loginCredentials.Password);
            
            return user;
        }
        string GenerateJWTToken(AppUser userInfo)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:SecretKey"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, userInfo.UserName),
                new Claim("fullName", userInfo.FirstName.ToString()+" "+userInfo.LastName.ToString()),
                new Claim("role",userInfo.UserRole.Role),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            };
            var token = new JwtSecurityToken(
            issuer: _config["Jwt:Issuer"],
            audience: _config["Jwt:Audience"],
            claims: claims,
            expires: DateTime.Now.AddMinutes(180),
            signingCredentials: credentials
            );
            return new JwtSecurityTokenHandler().WriteToken(token);
        }


    }
}
