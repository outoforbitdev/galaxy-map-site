import { useEffect, useRef, useState } from "react";
import Draggable from "./Draggable";
import PlanetMap, { IPlanet } from "./PlanetMap";
import styles from "./map.module.css";

interface IRoute {
  xone: number;
  yone: number;
  xtwo: number;
  ytwo: number;
}

interface IMapProps {
  planets: IPlanet[];
  routes: IRoute[];
  dimensions: {
    minX: number,
    minY: number,
    maxX: number,
    maxY: number,
  };
  initialZoom?: number;
}

export default function Map(props: IMapProps) {
  const mapWidth = props.dimensions.maxX - props.dimensions.minX;
  const mapHeight = props.dimensions.maxY - props.dimensions.minY;
  const scale = 20;
  const containerRef = useRef<HTMLDivElement>(null);
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(props.initialZoom ?? 1)
  const canvasWidth = mapWidth / zoomLevel;
  const canvasHeight = mapHeight / zoomLevel;

  useEffect(() => {
    if (containerRef.current) {
      const container = containerRef.current.getBoundingClientRect();
      setOffsetX((container.width - canvasWidth) / 2);
      setOffsetY((container.height - canvasHeight) / 2);
    }
  }, []);

  return (
    <div ref={containerRef} className={styles.container}>
      <Draggable initialPosition={{ x: 0, y: 0 }}>
        <svg
          style={{
            position: "relative",
            top: offsetY,
            left: offsetX,
          }}
          color="currentColor"
          fill="currentColor"
          width={`${canvasWidth}px`}
          height={`${canvasHeight}px`}
          viewBox={`0 0 ${mapWidth} ${mapHeight}`}
        >
          {props.planets.map((p: IPlanet, _i: number) => (
            <PlanetMap
              planet={p}
              centerX={props.dimensions.minX * -1}
              centerY={props.dimensions.maxY}
              scale={scale}
              currentFocusLevel={1}
              key={p.name}
            />
          ))}
        </svg>
      </Draggable>
    </div>
  );
}
