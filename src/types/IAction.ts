import { MouseEvent } from "react";

export interface IAction {
  title: string;
  function: (e: MouseEvent) => void
}