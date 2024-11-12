using System.ComponentModel.DataAnnotations.Schema;

namespace GalaxyMapSiteApi.Models;

[Table("solar_systems")]
public class System {
    #region Properties
    public string Name { get; set; } = "";
    [NotMapped]
    public Coordinates Coordinates { get; set; }
    public int X {
        get { return Coordinates.X; }
        set { Coordinates = new Coordinates(){ X = value, Y = Coordinates.Y }; }
    }
    public int Y {
        get { return Coordinates.Y; }
        set { Coordinates = new Coordinates(){ X = Coordinates.X, Y = value }; }
    }
    public string Sector { get; set; } = "";
    public string Region { get; set; } = "";
    public int Focus { get; set; }
    #endregion Properties
    #region Constructors
    // public System(string name, Coordinates coordinates) {
    //     Name = name;
    //     Coordinates = coordinates;
    // }
    // public System(string name, int x, int y, string sector, string region, int focus): this(name, new Coordinates(){ X = x, Y = y }) {}
    #endregion Constructors
}
