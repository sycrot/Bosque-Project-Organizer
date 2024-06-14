import { IAction } from "@/types/IAction";
import { IProject } from "@/types/IProject"

export interface IProjectItemProps {
  project: IProject;
  onClick?: () => void;
}