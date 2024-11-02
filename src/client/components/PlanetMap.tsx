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
  const planet = props.planet;
  const x = props.centerX + (planet.x / props.zoomLevel);
  const y = props.centerY - (planet.y / props.zoomLevel);
  const name = planet.name;
  const color = planet.color;
  const inFocus = planet.focusLevel >= props.zoomLevel;
  const radius = inFocus ? 3 : 2;

  // console.log(`${name}: ${planet.focusLevel}>=${props.zoomLevel*10}`)

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
