import { IComponent } from "./IComponent";
import NavLink from "./NavLink";
import classNames from "./classNames";
import styles from "./nav.module.css";

export interface INavBarProps extends IComponent {
  home?: string;
  homeLabel?: string;
}

export default function NavBar(props: INavBarProps) {
  return (
    <nav className={classNames(styles.nav, props.className)} id={props.id}>
      {props.home ? (
        <NavLink to={props.home}>{props.homeLabel ?? "Home"}</NavLink>
      ) : null}
      {props.children}
    </nav>
  );
}
