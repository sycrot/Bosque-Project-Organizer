import { IStage } from "@/types/IStage";
import { ITask } from "@/types/ITask";
import { v4 as uuidv4 } from 'uuid';
import { getLocalStorage, updateLocalStorage } from "./storageService";
import { IProject } from "@/types/IProject";
import { setProjects } from "./redux/projects/slice";
import { setFolders } from "./redux/folders/slice";
import { IFolder } from "@/types/IFolder";

export class StageService {
  private dispatch: any;

  constructor(dispatch: any) {
    this.dispatch = dispatch
  }

  public addStage(stage: IStage): void {
    const localStg = getLocalStorage()
    const projects = localStg.projects
    const project = projects.filter((p: IProject) => p.id === stage.idProject)

    if (project.length === 0) {
      this.addStageInFolder(stage)
      return
    }

    const stages = projects[0].stages
    const newStage: IStage = {
      ...stage,
      id: uuidv4(),
    }

    stages.push(newStage)

    this.dispatch(setProjects(projects))
    updateLocalStorage(localStg)
  }

  public addStageInFolder(stage: IStage): void {
    const localStg = getLocalStorage()
    const folders = localStg.folders

    folders.map((f: IFolder) => {
      const project = f.items?.filter((p: IProject) => p.id === stage.idProject)

      if (project) {
        const stages = project[0].stages

        const newStage: IStage = {
          ...stage,
          id: uuidv4(),
        }

        stages.push(newStage)

        this.dispatch(setFolders(folders))
        updateLocalStorage(localStg)

        return
      }
    })
  }

  public getStage(idProject: string, id: string) {
    const project = this.getStages(idProject).filter((s: IStage) => s.id === id)[0]

    return project
  }

  public getStages(idProject: string) {
    const localStg = getLocalStorage()
    const projects = localStg.projects
    const project = projects.filter((p: IProject) => p.id === idProject)

    if (project.length === 0) {
      const folders = localStg.folders

      const stages = folders.map((f: IFolder) => {
        const projectInFolder = f.items?.filter((p: IProject) => p.id === idProject)

        if (projectInFolder) return projectInFolder[0].stages
      })
      
      return stages[0]
    }

    const stages: IStage[] = project.stages

    return stages
  }

  public updateStage(stage: IStage): void {
    const localStg = getLocalStorage()
    const stages = localStg.projects.stages

    stages.map((s: IStage) => {
      if (s.id === stage.id) {
        s = stage
      }
    })

    updateLocalStorage(localStg)
  }

  public removeStage(id: string): void {
    const localStg = getLocalStorage()
    const stages = localStg.projects.stages
    const stage = stages.findIndex((s: IStage) => s.id === id)

    if (stage !== -1) stages.splice(stage, 1)

    updateLocalStorage(localStg)
  }
}