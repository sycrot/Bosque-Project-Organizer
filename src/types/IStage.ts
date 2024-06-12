import { ITask } from "./ITask";

export interface IStage {
  id: string;
	idProject: string;
	title: string;
	stage: number;
	tasks: ITask[];
  icon: string;
}