import { Icon, IIconProps } from "./Icon";

export default function DoubleArrowDown(props: IIconProps) {
  return (
    <Icon externalProps={props} viewBoxSize={100}>
      <g>
        <polyline points="0,10 50,60, 100,10" fill="none" />
        <polyline points="0,40 50,90, 100,40" fill="none" />
      </g>
    </Icon>
  );
}
