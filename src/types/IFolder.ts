import { IProject } from "./IProject";

export interface IFolder {
  id: string;
	title: string;
	items: IProject[];
	created: string
}