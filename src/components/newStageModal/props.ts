import { IProject } from "@/types/IProject";
import { IStage } from "@/types/IStage";

export interface INewStageModalProps {
  project: IProject;
  stage?: IStage;
  show: boolean;
  hide: () => void;
}