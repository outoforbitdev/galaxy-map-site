namespace GalaxyMapSiteApi.Models.Map;

public struct Spacelane{
    #region Properties
    public string Name { get; set; }
    public int XOne { get; set; }
    public int YOne { get; set; }
    public int XTwo { get; set; }
    public int YTwo { get; set; }
    public string Color { get; set; }
    public int FocusLevel { get; set; }
    #endregion Properties
    #region Constructors
    public Spacelane(Models.Spacelane spacelane){
        Name = spacelane.Name;
        XOne = spacelane.Origin.Coordinates.X;
        YOne = spacelane.Origin.Coordinates.Y;
        XTwo = spacelane.Destination.Coordinates.X;
        YTwo = spacelane.Destination.Coordinates.Y;
        Color = Enum.GetName(typeof(MapColor), MapColor.Gray) ?? "Gray";
        FocusLevel = (10 - spacelane.Focus) * 10 + 1;
    }
    #endregion Constructors
}
