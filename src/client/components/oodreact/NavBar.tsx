import { getDomProps, IComponentProps } from "./IComponent";
import NavLink from "./NavLink";
import classNames from "./classNames";
import styles from "./nav.module.css";

export interface INavBarProps extends IComponentProps {
  home?: string;
  homeLabel?: string;
}

export default function NavBar(props: INavBarProps) {
  return (
    <nav {...getDomProps(props, styles.nav)}>
      {props.home ? (
        <NavLink to={props.home}>{props.homeLabel ?? "Home"}</NavLink>
      ) : null}
      {props.children}
    </nav>
  );
}
