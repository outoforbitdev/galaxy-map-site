using GalaxyMapSiteApi.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace GalaxyMapSiteApi.Controllers;

[ApiController]
[Route("[controller]")]
public class SpacelanesController : ControllerBase
{
    private readonly SystemContext _context;
    private readonly ILogger<SpacelanesController> _logger;

    public SpacelanesController(ILogger<SpacelanesController> logger, SystemContext context)
    {
        _logger = logger;
        _context = context;
    }

    [HttpGet(Name = "GetSpacelanes")]
    public async Task<ActionResult<IEnumerable<Models.Map.Spacelane>>> Get()
    {
        List<Models.Spacelane> spacelanes = await _context.Spacelanes.Include(spacelane => spacelane.Origin).Include(spacelane => spacelane.Destination).ToListAsync();
        List<Models.Map.Spacelane> data = spacelanes.ConvertAll(s => new Models.Map.Spacelane(s));
        return data;
    }
}