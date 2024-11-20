import { useState } from "react";
import { getDomProps, IComponentProps } from "./IComponent";
import DoubleArrowDown from "./icons/DoubleArrowDown";
import DoubleArrowUp from "./icons/DoubleArrowUp";
import { IconColorScheme, IconSize } from "./icons/Icon";
import styles from "./expandable.module.css";

interface IExpandableProps extends IComponentProps {
  title?: string;
}

export default function Expandable(props: IExpandableProps) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div {...getDomProps(props, styles.expandable)}>
      {expanded ? (
        <span>
          <DoubleArrowUp
            onClick={() => setExpanded(false)}
            className={styles.toggle}
            clickable
          />
        </span>
      ) : (
        <DoubleArrowDown
          onClick={() => setExpanded(true)}
          className={styles.toggle}
          clickable
        />
      )}
      {expanded ? props.children : null}
    </div>
  );
}
