import { CSSProperties } from "react";
import { getDomProps, IChildlessComponentProps, IComponentProps } from "../IComponent";
import styles from "./icon.module.css";

export interface IIconProps extends IChildlessComponentProps {
  clickable?: boolean;
  colorScheme?: IconColorScheme;
  includeBackground?: boolean;
  size?: IconSize;
}

interface IIconInternalProps extends IComponentProps {
  externalProps: IIconProps;
  viewBoxSize: number;
}

export enum IconSize {
  Small = 10,
  Medium = 15,
  Large = 20,
}

export enum IconColorScheme {
  Neutral,
  NeutralInverted,
}

export function Icon(props: IIconInternalProps) {
  const sizeClass = getClassFromSize(props.externalProps.size);
  const foregroundColor = getForegroundColorFromScheme(
    props.externalProps.colorScheme,
  );
  const backgroundColor = getBackgroundColorFromScheme(
    props.externalProps.colorScheme,
  );
  const backgroundCornerRadius = props.viewBoxSize / 3;
  const background = (
    <rect
      x={0}
      y={0}
      height={props.viewBoxSize}
      width={props.viewBoxSize}
      rx={backgroundCornerRadius}
      fill={backgroundColor}
      stroke={backgroundColor}
    />
  );
  return (
    <svg
      stroke={foregroundColor}
      viewBox={`0 0 ${props.viewBoxSize} ${props.viewBoxSize}`}
      strokeWidth={10}
      {...getDomProps(props.externalProps, sizeClass, props.externalProps.clickable ? styles.clickable : undefined)}
    >
      {props.externalProps.includeBackground ? background : null}
      {props.children}
    </svg>
  );
}

function getClassFromSize(size?: IconSize) {
  switch(size){
    case IconSize.Small:
      return styles.small;
    case IconSize.Large:
      return styles.large;
    case IconSize.Medium:
    default:
      return styles.medium;
  }
}

function getBackgroundColorFromScheme(colorScheme?: IconColorScheme) {
  switch (colorScheme) {
    case IconColorScheme.NeutralInverted:
      return "var(--neutral-text)";
    case IconColorScheme.Neutral:
    default:
      return "var(--neutral-background)";
  }
}

function getForegroundColorFromScheme(colorScheme?: IconColorScheme) {
  switch (colorScheme) {
    case IconColorScheme.NeutralInverted:
      return "var(--neutral-background)";
    case IconColorScheme.Neutral:
    default:
      return "var(--neutral-text)";
  }
}
