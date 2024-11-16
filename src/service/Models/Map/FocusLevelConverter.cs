namespace GalaxyMapSiteApi.Models.Map;

public class FocusLevelConverter {
    public static int convertFormap(int level) {
        switch(level){
            case 1:
                return 100;
            case 2:
                return 40;
            case 3:
                return 20;
            case 4:
                return 10;
            case 5:
            default:
                return 1;
        }
    }
}