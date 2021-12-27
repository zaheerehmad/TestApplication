using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using TestApplication.Data;
using TestApplication.Data.Entities;
using TestApplication.Helpers;
using TestApplication.Models;

namespace TestApplication.Services
{
    public interface IUserService
    {
        AuthenticateResponse Authenticate(string username, string password);
        Accounts GetById(int id);
    }

    public class UserService : IUserService
    {
        private readonly AppSettings _appSettings;
        private DBContext _context;

        public UserService(DBContext context, IOptions<AppSettings> appSettings)
        {
            _context = context;
            _appSettings = appSettings.Value;
        }

        public AuthenticateResponse Authenticate(string username, string password)
        {
            if (string.IsNullOrEmpty(username) || string.IsNullOrEmpty(password))
                return null;

            var user = _context.Accounts.Local.SingleOrDefault(x => x.Username.ToLower() == username.ToLower());

            // check if username exists
            if (user == null)
                return null;

            // check if password is correct
            if (!VerifyPasswordHash(password, user.Password, "HardCodedForTestApplication"))
                return null;

            // authentication successful so generate jwt token
            var token = GenerateJwtToken(user);

            return new AuthenticateResponse(user, token);
        }

        public Accounts GetById(int id)
        {
            return _context.Accounts.Find(id);
        }

        private static bool VerifyPasswordHash(string password, string storedHash, string storedSalt)
        {
            if (password == null) throw new ArgumentNullException("password");
            if (string.IsNullOrWhiteSpace(password)) throw new ArgumentException("Value cannot be empty or whitespace only string.", "password");
            string computedHash = string.Empty;
            using (var hmac = new System.Security.Cryptography.HMACSHA512(Encoding.UTF8.GetBytes(storedSalt)))
            {
                var hash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));
                computedHash = Convert.ToBase64String(hash);
            }

            return computedHash == storedHash;
        }

        private string GenerateJwtToken(Accounts userAccount)
        {
            // generate token that is valid for 7 days
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[] { new Claim("id", userAccount.UserID.ToString()) }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

    }
}