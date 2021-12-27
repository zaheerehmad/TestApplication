using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;

namespace TestApplication.Data.Entities
{
    public class Accounts
    {
        public string Username { get; set; }
        [JsonProperty("PasswordHash")]
        public string Password { get; set; }
        [JsonProperty("UserId")]
        [Key]
        public int UserID { get; set; }
    }
}
