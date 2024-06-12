import { IStage } from "./IStage";

export interface IProject {
  id?: string;
  title: string;
	idPasta?: string;
	stages: IStage[];
  created?: string;
  lastVisited?: string;
  color: string;
}