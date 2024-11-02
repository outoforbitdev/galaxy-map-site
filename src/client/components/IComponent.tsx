import { ReactNode } from "react";

export interface IChildlessComponent {
  className?: string;
  id?: string;
}

export interface IComponent extends IChildlessComponent {
  children?: ReactNode;
}
