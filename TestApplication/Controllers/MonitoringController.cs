using Microsoft.AspNetCore.Mvc;
using TestApplication.Data;
using System.Linq;
using TestApplication.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace TestApplication.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class MonitoringController : ControllerBase
    {

        private readonly DBContext _context;
        public MonitoringController(DBContext context)
        {
            _context = context;
        }

        // GET: api/<MonitoringController>
        [HttpGet]
        [Authorize]
        public IActionResult Get()
        {
            var response = _context.MonitorData.Local.Select(x => new MonitorDataResponse(x.QueueGroup.Name, x.Offered, x.Handled, x.TalkTime,x.AfterCallWorkTime,x.HandledWithinSL,x.QueueGroup.SLAPercent)).ToList();
            return Ok(response);
        }
    }
}
