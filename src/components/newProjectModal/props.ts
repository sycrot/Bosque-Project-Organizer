import { IProject } from "@/types/IProject";

export interface INewProjectModalProps {
  show: boolean;
  handleClose: () => void;
  project?: IProject;
  actionText?: string;
}