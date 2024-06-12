import { ITask } from "@/types/ITask";
import { getLocalStorage, updateLocalStorage } from "./storageService";
import { v4 as uuidv4 } from 'uuid';
import { IProject } from "@/types/IProject";
import { IStage } from "@/types/IStage";

export class TaskService {
  public addTask(task: ITask) {
    const localStg = getLocalStorage()
    const folderProject = localStg.folders.filter((v: IProject) => v.id === task.idProject)
    const projectWithoutFolder = localStg.projects.filter((v: IProject) => v.id === task.idProject)

    const newTask: ITask = {
      ...task,
      id: uuidv4(),
    }

    if (folderProject.length > 0) {
      const stage = folderProject[0].stages.filter((s: IStage) => s.id === task.idStage)
      stage[0].tasks.push(newTask)
    } else {
      const stage = projectWithoutFolder[0].stages.filter((s: IStage) => s.id === task.idStage)
      stage[0].tasks.push(newTask)
    }

    updateLocalStorage(localStg)
  }

  public getTask(id: string) {
    const folder = this.getTasks().filter((v: ITask) => v.id === id)[0]

    return folder
  }

  public getTasks() {
    const localStg = getLocalStorage()
    const folders: any[] = localStg.folders

    return folders
  }

  public updateTask(item: ITask) {
    const localStg = getLocalStorage()
    const folderProject = localStg.folders.filter((v: IProject) => v.id === item.idProject)
    const projectWithoutFolder = localStg.projects.filter((v: IProject) => v.id === item.idProject)

    if (folderProject.length > 0) {
      const stage = folderProject[0].stages.filter((s: IStage) => s.id === item.idStage)
      stage[0].tasks.map((v: ITask) => {
        if (v.id === item.id) {
          v = item
        }
      })
    } else {
      const stage = projectWithoutFolder[0].stages.filter((s: IStage) => s.id === item.idStage)
      stage[0].tasks.map((v: ITask) => {
        if (v.id === item.id) {
          v = item
        }
      })
    }

    updateLocalStorage(localStg)
  }

  public deleteTask(task: ITask) {
    const localStg = getLocalStorage()
    const folderProject: IProject[] = localStg.folders.filter((v: IProject) => v.id === task.idProject)
    const projectWithoutFolder: IProject[] = localStg.projects.filter((v: IProject) => v.id === task.idProject)

    if (folderProject.length > 0) {
      const stages = folderProject[0].stages
      const stage = stages.findIndex(v => v.id === task.idStage)

      if (stage !== -1) stages.splice(stage, 1)
    } else {
      const stages = projectWithoutFolder[0].stages
      const stage = stages.findIndex(v => v.id === task.idStage)

      if (stage !== -1) stages.splice(stage, 1)
    }

    updateLocalStorage(localStg)
  }
}