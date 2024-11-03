import {
  CSSProperties,
  RefObject,
  useRef,
  useState,
  PointerEvent,
  PointerEventHandler,
} from "react";
import { IComponent } from "./IComponent";
import styles from "./draggable.module.css";

interface IDraggableProps extends IComponent {
  initialPosition: IPosition;
}

export interface IPosition {
  x: number;
  y: number;
}

const defaultPosition: IPosition = { x: 0, y: 0 };

export default function Draggable(props: IDraggableProps) {
  const draggableRef = useRef<HTMLDivElement>(null);
  const staticRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(props.initialPosition);
  const [relativePosition, setRelativePosition] = useState(defaultPosition);
  const [isDragging, setIsDragging] = useState(false);
  const [pointerId, setPointerId] = useState(0);
  const pointerEventCache = useRef<PointerEvent<HTMLDivElement>[]>([]);

  const onPointerDown: PointerEventHandler<HTMLDivElement> = function (e) {
    if (e.button != 0) return;
    pointerEventCache.current.push(e);
    if (pointerEventCache.current.length !== 1) return;

    setIsDragging(true);
    setPointerId(e.pointerId);
    const draggablePosition = getPositionFromRef(draggableRef);
    const staticPosition = getPositionFromRef(staticRef);
    const divPosition = diffPositions(draggablePosition, staticPosition);

    const relativePosition = {
      x: e.pageX - divPosition.x,
      y: e.pageY - divPosition.y,
    };

    setRelativePosition(relativePosition);

    e.stopPropagation();
    e.preventDefault();
  };

  const onPointerEnd: PointerEventHandler<HTMLDivElement> = function (e) {
    pointerEventCache.current = pointerEventCache.current.filter(
      (cached) => cached.pointerId !== e.pointerId,
    );
    if (pointerEventCache.current.length !== 0) return;
    if (!isDragging) return;
    if (e.pointerId != pointerId) return;
    setIsDragging(false);

    e.stopPropagation();
    e.preventDefault();
  };

  const onPointerMove: PointerEventHandler<HTMLDivElement> = function (e) {
    if (pointerEventCache.current.length !== 1) return;
    if (!isDragging) return;
    if (e.pointerId != pointerId) return;

    const currentPosition = {
      x: e.pageX - relativePosition.x,
      y: e.pageY - relativePosition.y,
    };
    setPosition(currentPosition);

    e.stopPropagation();
    e.preventDefault();
  };

  const positionStyle: CSSProperties = {
    top: `${position.y}px`,
    left: `${position.x}px`,
    position: "relative",
  };
  return (
    <div
      ref={staticRef}
      className={styles.draggable}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerEnd}
    >
      <div
        ref={draggableRef}
        style={positionStyle}
        className={props.className}
        id={props.id}
      >
        {props.children}
      </div>
    </div>
  );
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
