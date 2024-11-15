namespace GalaxyMapSiteApi.Models.Map;

public struct System {
    #region Properties
    public string Name { get; set; }
    public int X { get; set; }
    public int Y { get; set; }
    public string Color { get; set; }
    public int FocusLevel { get; set; }
    #endregion Properties
    #region Constructors
    public System(Models.System system) {
        Name = system.Name;
        X = system.Coordinates.X;
        Y = system.Coordinates.Y;
        Color = Enum.GetName(typeof(MapColor), MapColor.Gray) ?? "Gray";
        FocusLevel = (10 - system.Focus) * 10 + 1;
    }
    #endregion Constructors
}
