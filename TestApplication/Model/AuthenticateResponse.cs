using TestApplication.Data.Entities;

namespace TestApplication.Models
{
    public class AuthenticateResponse
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string Token { get; set; }


        public AuthenticateResponse(Accounts userAccount, string token)
        {
            Id = userAccount.UserID;
            Username = userAccount.Username;
            Token = token;
        }
    }
}