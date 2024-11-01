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
    const offset = size/2;

    return(
        <div className={styles.container}>
            <Draggable initialPosition={{x: 0, y: 0}}>
                <svg color="currentColor" fill="currentColor" width={sizeString} height={sizeString}>
                    {props.planets.map((p: IPlanet, _i: number) => (
                            <PlanetMap planet={p} offset={offset} scale={scale} currentFocusLevel={1} key={p.name} />
                        ))
                    }
                </svg>
          </Draggable>
        </div>
    );
}