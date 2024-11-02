import { useEffect, useRef, useState, WheelEventHandler } from "react";
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
    minX: number;
    minY: number;
    maxX: number;
    maxY: number;
  };
  initialZoom?: number;
}

interface IGenericEvent {
  pageX: number;
  pageY: number;
}

export default function Map(props: IMapProps) {
  const mapWidth = props.dimensions.maxX - props.dimensions.minX;
  const mapHeight = props.dimensions.maxY - props.dimensions.minY;
  const centerX = props.dimensions.minX * -1;
  const centerY = props.dimensions.maxY;
  const scale = 20;
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<SVGSVGElement>(null);
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(props.initialZoom ?? 1);

  useEffect(() => {
    if (containerRef.current) {
      const container = containerRef.current.getBoundingClientRect();
      setOffsetX((container.width - mapWidth) / 2);
      setOffsetY((container.height - mapHeight) / 2);
    }
  }, []);

  const onWheel: WheelEventHandler<SVGElement> = function (e) {
    adjustZoom(e.deltaY * 0.1, e);
  };

  const adjustZoom = function (scrollDistance: number, event: IGenericEvent) {
    if (!mapRef.current) return;

    // Set zoom level
    let newZoomLevel;
    if (scrollDistance > 0) {
      newZoomLevel = zoomLevel / scrollDistance;
    } else {
      newZoomLevel = zoomLevel * (scrollDistance * -1);
    }
    setZoomLevel(newZoomLevel);

    // Adjust offset to keep map centered on mouse
    const oldMousePixel = mouseToPixel(
      event,
      mapRef.current.getBoundingClientRect(),
    );
    const oldDistanceToCenter = {
      x: oldMousePixel.x - centerX,
      y: centerY - oldMousePixel.y,
    };
    const newDistanceToCenter = {
      x: (oldDistanceToCenter.x * zoomLevel) / newZoomLevel,
      y: (oldDistanceToCenter.y * zoomLevel) / newZoomLevel,
    };
    const newMousePixel = {
      x: newDistanceToCenter.x + centerX,
      y: centerY - newDistanceToCenter.y,
    };
    setOffsetX(offsetX + oldMousePixel.x - newMousePixel.x);
    setOffsetY(offsetY + oldMousePixel.y - newMousePixel.y);
  };
  console.log(zoomLevel);

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
          width={`${mapWidth}px`}
          height={`${mapHeight}px`}
          // viewBox={`0 0 ${mapWidth} ${mapHeight}`}
          onWheel={onWheel}
          ref={mapRef}
        >
          {props.planets.map((p: IPlanet, _i: number) => (
            <PlanetMap
              planet={p}
              centerX={centerX}
              centerY={centerY}
              key={p.name}
              zoomLevel={zoomLevel}
            />
          ))}
        </svg>
      </Draggable>
    </div>
  );
}

function mouseToPixel(
  e: IGenericEvent,
  boundingRect: { x: number; y: number },
) {
  return {
    x: e.pageX - boundingRect.x,
    y: e.pageY - boundingRect.y,
  };
}
