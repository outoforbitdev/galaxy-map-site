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
  scale: number;
  currentFocusLevel: number;
}

export default function PlanetMap(props: IPlanetMapProps) {
  const planet = props.planet;
  const x = props.centerX + planet.x / props.scale;
  const y = props.centerY - planet.y / props.scale;
  const name = planet.name;
  const color = planet.color;
  const inFocus = planet.focusLevel <= props.currentFocusLevel;
  const radius = inFocus ? 3 : 2;

  // console.log(`${name}: ${x}, ${y}`)

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
