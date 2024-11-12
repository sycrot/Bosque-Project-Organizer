import { IStage } from "./IStage";

export interface IProject {
  id?: string;
  title: string;
  idFolder?: string;
  stages: IStage[];
  created?: string;
  lastVisited?: string;
  color: string;
  workingTime: number;
}