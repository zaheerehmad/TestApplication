using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using System.Threading.Tasks;
using TestApplication.Model;
using TestApplication.Services;

namespace TestApplication.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private IUserService _userService;

        public UsersController(
           IUserService userService
          )
        {
            _userService = userService;          
        }

        // POST: /Account/Login
        [AllowAnonymous]
        public IActionResult Post([FromBody] AuthenticateRequest model)
        {
            var response = _userService.Authenticate(model.Username, model.Password);

            if (response == null)
                return BadRequest(new { message = "Username or password is incorrect" });

            return Ok(response);
        }
    }
}
