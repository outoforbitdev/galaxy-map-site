using System.ComponentModel.DataAnnotations.Schema;

namespace GalaxyMapSiteApi.Models;

public class System {
    #region Properties
    public string Name { get; set; }
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
    #endregion Properties
    #region Constructors
    public System(string name, Coordinates coordinates) {
        Name = name;
        Coordinates = coordinates;
    }
    public System(string name, int x, int y): this(name, new Coordinates(){ X = x, Y = y }) {}
    #endregion Constructors
}
