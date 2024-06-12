import { IProject } from "@/types/IProject";
import { v4 as uuidv4 } from 'uuid';
import { getLocalStorage, updateLocalStorage } from "./storageService";

export class ProjectService {
  public addProject(project: IProject) {
    const created = new Date()
    const localStg = getLocalStorage()
    const projects = localStg.projects

    const newProject: IProject = {
      id: uuidv4(),
      title: project.title,
      color: project.color,
      stages: [],
      created: created.toISOString()
    }

    projects.push(newProject)

    updateLocalStorage(localStg)
  }

  public getProject(id: string) {
    const project = this.getProjects().filter((v: IProject) => v.id === id)[0]

    return project
  }

  public getProjects() {
    const localStg = getLocalStorage()
    const projects: any[] = localStg.projects

    return projects
  }

  public updateProject(item: IProject) {
    const localStg = getLocalStorage()
    const projects = localStg.projects

    projects.map((p: IProject) => {
      if (p.id === item.id) {
        p = item
      }
    })

    updateLocalStorage(localStg)
  }

  public deleteProject(id: string) {
    const localStg = getLocalStorage()
    const projects = localStg.projects
    const project = projects.findIndex((p: IProject) => p.id === id)

    if (project !== -1) projects.splice(project, 1)

    updateLocalStorage(localStg)
  }

  public updateLastVisited(id: string) {
    const localStg = getLocalStorage()
    const projects = localStg.projects
    const lastVisited = new Date()

    projects.map((p: IProject) => {
      if (p.id === id) {
        p = {
          ...p,
          lastVisited: lastVisited.toISOString()
        }
      }
    })

    updateLocalStorage(localStg)
  }
}