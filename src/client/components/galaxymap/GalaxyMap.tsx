import ZoomableMap, { IZoomableMapProps } from "./ZoomableMap";
import { MapOptions } from "./MapOptions";
import { useState } from "react";

export interface IMapProps extends IZoomableMapProps {

}

export default function Map(props: IMapProps) {
  const [hidePlanetLabels, setHidePlanetLabels] = useState(props.mapOptions?.hidePlanetLabels ?? false);
  const [hideSpacelaneLabels, setHideSpacelaneLabels] = useState(props.mapOptions?.hideSpacelaneLabels ?? false);
  const [showAllPlanets, setShowAllPlanets] = useState(props.mapOptions?.showAllPlanets ?? false);
  const [showAllSpacelanes, setShowAllSpacelanes] = useState(props.mapOptions?.showAllSpacelanes ?? false);

  const mapOptions = createMapOptions(hidePlanetLabels, setHidePlanetLabels, hideSpacelaneLabels, setHideSpacelaneLabels, showAllPlanets, setShowAllPlanets, showAllSpacelanes, setShowAllSpacelanes);

  props.mapOptions.hidePlanetLabels = hidePlanetLabels;
  props.mapOptions.hideSpacelaneLabels = hideSpacelaneLabels;
  props.mapOptions.showAllPlanets = showAllPlanets;
  props.mapOptions.showAllSpacelanes = showAllSpacelanes;

  return (
    <div>
      <MapOptions mapOptions={mapOptions} />
      <ZoomableMap {...props} />
    </div>
  );
}

function createMapOptions(
  hidePlanetLabels: boolean, 
  setHidePlanetLabels: (value: boolean) => void,
  hideSpacelaneLabels: boolean,
  setHideSpacelaneLabels: (value: boolean) => void,
  showAllPlanets: boolean,
  setShowAllPlanets: (value: boolean) => void,
  showAllSpacelanes: boolean,
  setShowAllSpacelanes: (value: boolean) => void,
) {
  return [
    createSingleMapOption(hidePlanetLabels, setHidePlanetLabels, "Hide planet labels", "checkbox"),
    createSingleMapOption(hideSpacelaneLabels, setHideSpacelaneLabels, "Hide spacelane labels", "checkbox"),
    createSingleMapOption(showAllPlanets, setShowAllPlanets, "Show all planets", "checkbox"),
    createSingleMapOption(showAllSpacelanes, setShowAllSpacelanes, "Show all spacelanes", "checkbox"),
  ]
}

function createSingleMapOption<T>(value: T, setValue: (value: T) => void, label: string, inputType: string) {
  return {
    currentValue: value,
    setValue: setValue,
    label: label,
    inputType: inputType,
  }
}
