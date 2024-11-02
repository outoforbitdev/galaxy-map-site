import classNames from "./classNames";
import { IComponent } from "./IComponent";
import styles from "./nav.module.css";

export interface INavLinkProps extends IComponent {
  to: string;
}

export default function NavLink(props: INavLinkProps) {
  return (
    <a
      href={props.to}
      className={classNames(styles.nav, styles.item, props.className)}
    >
      {props.children}
    </a>
  );
}
