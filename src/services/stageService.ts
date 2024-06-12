import { IStage } from "@/types/IStage";
import { ITask } from "@/types/ITask";
import { v4 as uuidv4 } from 'uuid';
import { getLocalStorage, updateLocalStorage } from "./storageService";
import { IProject } from "@/types/IProject";

export class StageService {
  public addStage(stage: IStage): void {
    const localStg = getLocalStorage()
    const stages = localStg.projects.filter((p: IProject) => p.id === stage.idProject)[0].stages
    const stageNumber = stages.filter((s: IStage) => s.stage === stage.stage)

    if (stageNumber.length > 0) {
      console.error("O nível de estágio já existe.")
      return
    }

    const newStage: IStage = {
      ...stage,
      id: uuidv4(),
    }

    stages.push(newStage)

    updateLocalStorage(localStg)
  }

  public getStage(id: string) {
    const project = this.getStages().filter((s: IStage) => s.id === id)[0]

    return project
  }

  public getStages() {
    const localStg = getLocalStorage()
    const stages: IStage[] = localStg.projects.stages

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