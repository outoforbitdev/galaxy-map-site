using Microsoft.AspNetCore.Mvc;

namespace GalaxyMapSiteApi.Controllers;

public struct Planet{
    public Planet(string name, int x, int y, string color, int focusLevel){
        Name = name;
        X = x;
        Y = y;
        Color = color;
        FocusLevel = focusLevel;
    }
    public string Name { get; set; }
    public int X { get; set; }
    public int Y { get; set; }
    public string Color { get; set; }
    public int FocusLevel { get; set; }
}

[ApiController]
[Route("[controller]")]
public class PlanetsController : ControllerBase
{
    private readonly ILogger<PlanetsController> _logger;

    public PlanetsController(ILogger<PlanetsController> logger)
    {
        _logger = logger;
    }

    [HttpGet(Name = "GetPlanets")]
    public IEnumerable<Planet> Get()
    {
        return planetList.ToArray();
    }

    private static List<Planet> planetList  = new List<Planet>(){
        new Planet("Graveyard",1328,-63, "orange", 1),
        new Planet("Shipyard 6",3234,-4109, "orange", 2),
        new Planet("Annapolis",391,250, "green", 1),
        new Planet("Sapphire",4500,1781, "green", 2),
        new Planet("Cloudin",-969,-8547, "orange", 1),
        new Planet("Corporatus",7453,6016, "pink", 1),
        new Planet("Documents",1161,48, "green", 2),
        new Planet("West Point",1546,546, "green", 1),
        new Planet("Crystal",5844,-6844, "orange", 2),
        new Planet("Trade Core",1563,-1859, "red", 1),
        new Planet("Capital",0,0, "green", 1),
        new Planet("Swamp",1641,-9516, "orange", 2),
        new Planet("Witchaven",3156,3625, "saddlebrown", 2),
        new Planet("Blue Trade Core",1563,-1891, "orange", 2),
        new Planet("PMC",1563,-8297, "green", 2),
        new Planet("Jungle",6813,3781, "orange", 2),
        new Planet("Artic",-953,-8609, "orange", 2),
        new Planet("Shipyard Prime",1859,-578, "green", 1),
        new Planet("Campaign",5359,5938, "pink", 2),
        new Planet("Zillow",2078,-6828, "orange", 2),
        new Planet("L'izard",-953,-578, "green", 2),
        new Planet("Tails",6719,-7625, "orange", 1),
        new Planet("Count",4078,4625, "pink", 2),
        new Planet("Jowels",1547,-7813, "orange", 1),
        new Planet("Terminal",-734,-10922, "orange", 2),
        new Planet("Medkit",672,-4422, "green", 1),
        new Planet("Gas'Giant",844,-4891, "orange", 2),
    };
}
