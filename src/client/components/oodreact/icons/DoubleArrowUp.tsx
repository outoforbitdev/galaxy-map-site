import { Icon, IIconProps } from "./Icon";

export default function DoubleArrowUp(props: IIconProps) {
  return (
    <Icon externalProps={props} viewBoxSize={100}>
      <g>
        <polyline points="20,50 50,20, 80,50" fill="none" />
        <polyline points="20,80 50,50, 80,80" fill="none" />
      </g>
    </Icon>
  );
}
