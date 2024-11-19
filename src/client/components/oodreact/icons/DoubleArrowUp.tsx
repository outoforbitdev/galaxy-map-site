import { Icon, IIconProps } from "./Icon";

export default function DoubleArrowUp(props: IIconProps) {
  return (
    <Icon externalProps={props} viewBoxSize={100}>
      <g>
        <polyline points="0,60 50,10, 100,60" fill="none" />
        <polyline points="0,90 50,40, 100,90" fill="none" />
      </g>
    </Icon>
  );
}
