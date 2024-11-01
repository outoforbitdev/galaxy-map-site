import { useEffect, useRef, useState } from "react";
import Draggable from "./Draggable";
import PlanetMap, { IPlanet } from "./PlanetMap";
import styles from "./map.module.css"

interface IRoute {
    xone: number,
    yone: number,
    xtwo: number,
    ytwo: number,
}

interface IMapProps {
    planets: IPlanet[],
    routes: IRoute[],
}

export default function Map(props: IMapProps) {
    const size = 1000;
    const sizeString=`${size}px`
    const scale = 20;
    const centerPixel = size/2;
    const containerRef = useRef<HTMLDivElement>(null);
    const mapRef = useRef<HTMLDivElement>(null);
    const [offsetX, setOffsetX] = useState(0);
    const [offsetY, setOffsetY] = useState(0);

    useEffect(() => {
        if (containerRef.current) {
            const container = containerRef.current.getBoundingClientRect();
            setOffsetX((container.width - size) / 2);
            setOffsetY((container.height - size) / 2);
        }
    }, []);

    return(
        <div ref={containerRef} className={styles.container}>
            <Draggable initialPosition={{x: 0, y: 0}}>
                <svg style={{position: "relative", top: offsetY, left: offsetX}} color="currentColor" fill="currentColor" width={sizeString} height={sizeString}>
                    {props.planets.map((p: IPlanet, _i: number) => (
                            <PlanetMap planet={p} centerPixel={centerPixel} scale={scale} currentFocusLevel={1} key={p.name} />
                        ))
                    }
                </svg>
          </Draggable>
        </div>
    );
}