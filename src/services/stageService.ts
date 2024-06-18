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
    const project = projects.findIndex((p: IProject) => p.id === stage.idProject)

    if (project === -1) {
      this.addStageInFolder(stage)
      return
    }

    const stages = projects[project].stages

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
      const projects = f.items ?? []
      const projectIndex = projects.findIndex((p: IProject) => p.id === stage.idProject)

      if (projectIndex !== -1) {
        const stages = projects[projectIndex].stages

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
    const project = projects.findIndex((p: IProject) => p.id === idProject)

    if (project === -1) {
      const folders = localStg.folders

      const stages = folders.map((f: IFolder) => {
        const projectsInFolder = f.items ?? []
        const projectInFolder = projectsInFolder?.findIndex((p: IProject) => p.id === idProject)

        if (projectInFolder !== -1) return projectsInFolder[projectInFolder].stages
      })

      return stages.filter((v: any) => v !== undefined)[0]
    }

    const stages: IStage[] = projects[project].stages

    return stages
  }

  public updateStage(stage: IStage): void {
    const localStg = getLocalStorage()
    const projects = localStg.projects
    const project = projects.findIndex((p: IProject) => p.id === stage.idProject);
    
    if (project === -1) {
      this.updateStageFromFolder(stage)
      return
    }

    const currentProject = projects[project]
    const projectStage = currentProject.stages.findIndex((s: IStage) => s.id === stage.id)

    if (projectStage !== -1) {
      currentProject.stages[projectStage] = stage

      projects[project] = currentProject

      this.dispatch(setProjects(projects))
      updateLocalStorage(localStg)
    }

  }

  public updateStageFromFolder(stage: IStage) {
    const localStg = getLocalStorage()
    const folders = localStg.folders
    const projects = localStg.projects

    folders.map((f: IFolder) => {
      const projectsInFolder = f.items ?? []
      const project = projectsInFolder.findIndex(p => p.id === stage.idProject)

      if (project !== -1) {
        const currentProject = projectsInFolder[project]
        const projectStage = currentProject.stages.findIndex((s: IStage) => s.id === stage.id)
  
        if (projectStage !== -1) {
          currentProject.stages[projectStage] = stage
  
          projectsInFolder[project ?? -1] = currentProject
  
          this.dispatch(setFolders(folders))
          this.dispatch(setProjects(projects))
          updateLocalStorage(localStg)
        }
      }
    })
  }

  public removeStage(stage: IStage): void {
    const localStg = getLocalStorage()
    const projects = localStg.projects
    const project = projects.filter((p: IProject) => p.id === stage.idProject)

    if (project.length === 0) {
      this.removeStageFromFolder(stage)
      return
    }

    const projectStages = project[0].stages
    const projectStage = projectStages.findIndex((s: IStage) => s.id === stage.id)

    if (projectStage !== -1) projectStages.splice(projectStage, 1)

    this.dispatch(setProjects(projects))
    updateLocalStorage(localStg)
  }

  public removeStageFromFolder(stage: IStage) {
    const localStg = getLocalStorage()
    const folders = localStg.folders
    const projects = localStg.projects

    folders.map((f: IFolder) => {
      const project = f.items?.filter(p => p.id === stage.idProject)

      if (project) {
        const projectStages = project[0].stages
        const projectStage = projectStages.findIndex((s: IStage) => s.id === stage.id)

        if (projectStage !== -1) projectStages.splice(projectStage, 1)

        this.dispatch(setProjects(folders))
        this.dispatch(setProjects(projects))
        updateLocalStorage(localStg)
      }
    })
  }
}