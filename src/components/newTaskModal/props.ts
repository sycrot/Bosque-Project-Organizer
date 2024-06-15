import { IStage } from "@/types/IStage";

export interface INewTaskModal {
  show: boolean;
  hide: () => void;
  stage: IStage;
}