import { CSSProperties, MouseEventHandler, RefObject, useEffect, useRef, useState } from "react";
import { IComponent } from "./IComponent";

interface IDraggableProps extends IComponent {
    initialPosition: IPosition,
}

export interface IPosition {
    x: number,
    y: number,
}

const defaultPosition: IPosition = {x: 0, y: 0};

type MouseHandler = MouseEventHandler<HTMLDivElement>

export default function Draggable(props: IDraggableProps) {
    const draggableRef = useRef<HTMLDivElement>(null);
    const staticRef = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState(props.initialPosition)
    const [relativePosition, setRelativePosition] = useState(defaultPosition)
    const [isDragging, setIsDragging] = useState(false);

    const onMouseDown: MouseHandler = function(e) {
        if (e.button != 0) return;

        setIsDragging(true);
        const draggablePosition = getPositionFromRef(draggableRef);
        const staticPosition = getPositionFromRef(staticRef);
        const divPosition = diffPositions(draggablePosition, staticPosition);

        const relativePosition = {
            x: e.pageX - divPosition.x,
            y: e.pageY - divPosition.y,
        }

        setRelativePosition(relativePosition);

        e.stopPropagation();
        e.preventDefault();
    }

    const onMouseUp = function(e: MouseEvent) {
        setIsDragging(false);

        e.stopPropagation();
        e.preventDefault();
    }

    const onMouseMove = function(e: MouseEvent) {
        if (!isDragging) return;

        const currentPosition = {
            x: e.pageX - relativePosition.x,
            y: e.pageY - relativePosition.y,
        }
        setPosition(currentPosition)

        e.stopPropagation();
        e.preventDefault();
    }

    useEffect(() => {
        document.addEventListener("mouseup", onMouseUp);
        document.addEventListener("mousemove", onMouseMove);

        return () => {
            document.removeEventListener("mouseup", onMouseUp);
            document.removeEventListener("mousemove", onMouseMove);
        }
    }, [isDragging]);
    
    const styles: CSSProperties = {
        top: `${position.y}px`,
        left: `${position.x}px`,
        position: "relative",
    }
    return (
        <div ref={staticRef}>
            <div 
                ref={draggableRef} 
                style={styles} 
                className={props.className} 
                id={props.id} 
                onMouseDown={onMouseDown}
            >
                {props.children}
            </div>
        </div>
    )
}

function diffPositions(first: IPosition, second: IPosition) {
    return {
        x: first.x - second.x,
        y: first.y - second.y,
    };
}

function getPositionFromRef(ref: RefObject<HTMLDivElement>) {
    return ref.current ? ref.current.getBoundingClientRect() : defaultPosition;
}