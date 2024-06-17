import { ITask } from "@/types/ITask";
import { getLocalStorage, updateLocalStorage } from "./storageService";
import { v4 as uuidv4 } from 'uuid';
import { IProject } from "@/types/IProject";
import { IStage } from "@/types/IStage";
import { IFolder } from "@/types/IFolder";
import { setProjects } from "./redux/projects/slice";
import { setFolders } from "./redux/folders/slice";

export class TaskService {
  private dispatch: any;

  constructor(dispatch: any) {
    this.dispatch = dispatch
  }

  public addTask(task: ITask) {
    const localStg = getLocalStorage()
    const projects = localStg.projects
    const project = projects.filter((v: IProject) => v.id === task.idProject)

    const newTask: ITask = {
      ...task,
      id: uuidv4(),
    }

    if (project.length === 0) {
      this.addTaskInProjectOfFolder(newTask)
      return
    }

    const stage = project[0].stages.filter((s: IStage) => s.id === task.idStage)
    stage[0].tasks.push(newTask)

    this.dispatch(setProjects(projects))
    updateLocalStorage(localStg)
  }

  public addTaskInProjectOfFolder(task: ITask) {
    const localStg = getLocalStorage()
    const folders = localStg.folders

    folders.map((f: IFolder) => {
      const project = f.items?.filter((p: IProject) => p.id === task.idProject)

      if (project) {
        const stage = project[0].stages.filter((s: IStage) => s.id === task.idStage)

        stage[0].tasks.push(task)

        this.dispatch(setFolders(folders))
        updateLocalStorage(localStg)

        return
      }
    })
  }

  public getTask(stage: IStage, idTask: string) {
    const task = this.getTasks(stage).filter((v: ITask) => v.id === idTask)

    if (task.length !== 0) return task[0]
  }

  public getTasks(stage: IStage) {
    const localStg = getLocalStorage()
    const project = localStg.projects.filter((p: IProject) => p.id === stage.idProject)

    if (project.length === 0) {
      return this.getTasksAtFolder(stage)
    }

    const currentStage = project[0].stages.filter((s: IStage) => s.id === stage.id)

    if (currentStage.length > 0) return currentStage[0].tasks
  }

  public getTasksAtFolder(stage: IStage) {
    const localStg = getLocalStorage()
    const folders = localStg.folders

    folders.map((f: IFolder) => {
      const projects = f.items ?? []
      const projectIndex = projects.findIndex(p => p.id === stage.idProject)

      if (projectIndex !== -1) {
        const projectStages = projects[projectIndex].stages ?? []
        const currentStage = projectStages.findIndex(s => s.id === stage.id)

        if (currentStage !== -1) return projectStages[currentStage].tasks
      }
    })
  }

  public deleteTask(task: ITask) {
    const localStg = getLocalStorage()
    const projects = localStg.projects
    const projectWithoutFolder: IProject[] = projects.filter((v: IProject) => v.id === task.idProject)

    if (projectWithoutFolder.length === 0) {
      this.deleteTaskInFolder(task)
      this.dispatch(setProjects(projects))
      return
    }

    const stage = projectWithoutFolder[0].stages.filter(s => s.id === task.idStage)

    const taskIndex = stage[0].tasks.findIndex(v => v.id === task.id)

    if (taskIndex !== -1) {
      stage[0].tasks.splice(taskIndex, 1)

      this.dispatch(setProjects(projects))
      updateLocalStorage(localStg)
      return
    }
  }

  public deleteTaskInFolder(task: ITask) {
    const localStg = getLocalStorage()
    const folders = localStg.folders

    folders.map((f: IFolder) => {
      const project = f.items?.filter((p: IProject) => p.id === task.idProject)

      if (project) {
        const stage = project[0].stages.filter((s: IStage) => s.id === task.idStage)
        const taskIndex = stage[0].tasks.findIndex(v => v.id === task.id)

        if (taskIndex !== -1) {
          stage[0].tasks.splice(taskIndex, 1)
    
          this.dispatch(setProjects(folders))
          updateLocalStorage(localStg)
        }
      }
    })
  }
}