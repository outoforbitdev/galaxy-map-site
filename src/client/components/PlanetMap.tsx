import { zoomLevelToModifier } from "./GalaxyMap";

export interface IPlanet {
  name: string;
  x: number;
  y: number;
  color: string;
  focusLevel: number;
}

interface IPlanetMapProps {
  planet: IPlanet;
  centerX: number;
  centerY: number;
  zoomLevel: number;
}

export default function PlanetMap(props: IPlanetMapProps) {
  const zoomModifier = zoomLevelToModifier(props.zoomLevel);
  const planet = props.planet;
  const x = props.centerX + planet.x / zoomModifier;
  const y = props.centerY - planet.y / zoomModifier;
  const name = planet.name;
  const color = planet.color;
  const inFocus = planet.focusLevel >= zoomModifier;
  const radius = inFocus ? 3 : zoomModifier - planet.focusLevel < 10 ? 2 : 1;
  console.log(`${name}: ${planet.focusLevel} : ${zoomModifier}`);

  return (
    <g fill={color} stroke={color}>
      <circle cx={x} cy={y} r={radius} />
      {inFocus ? (
        <text x={x + 10} y={y + 5}>
          {name}
        </text>
      ) : null}
    </g>
  );
}
