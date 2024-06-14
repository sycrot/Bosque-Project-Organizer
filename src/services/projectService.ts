/* eslint-disable react-hooks/rules-of-hooks */
import { IProject } from "@/types/IProject";
import { v4 as uuidv4 } from 'uuid';
import { getLocalStorage, updateLocalStorage } from "./storageService";
import { IFolder } from "@/types/IFolder";
import { IStage } from "@/types/IStage";
import { FolderService } from "./folderService";
import { setProjects } from "./redux/projects/slice";
import { setFolders } from "./redux/folders/slice";
import { useDispatch } from "react-redux";

export class ProjectService {
  private dispatch: any;

  constructor(dispatch: any) {
    this.dispatch = dispatch;
  }

  public addProject(project: IProject) {
    if (project.idFolder !== '') {
      this.addProjectInFolder(project)
      return
    }

    const created = new Date()
    const localStg = getLocalStorage()
    const projects = localStg.projects

    const newProject: IProject = {
      ...project,
      id: uuidv4(),
      created: created.toISOString()
    }

    projects.push(newProject)

    this.dispatch(setProjects(projects))
    updateLocalStorage(localStg)
  }

  public addProjectInFolder(project: IProject) {
    const created = new Date()
    const localStg = getLocalStorage()
    const folder = localStg.folders.filter((v: IFolder) => v.id === project.idFolder)[0]

    const newProject: IProject = {
      ...project,
      id: uuidv4(),
      created: created.toISOString()
    }

    folder.items.push(newProject)

    this.dispatch(setFolders(localStg.folders))
    updateLocalStorage(localStg)
  }

  public updateProjectInFolder(project: IProject) {
    const localStg = getLocalStorage()
    const folders = [...localStg.folders]
    const folderIndex = folders.findIndex((f: IFolder) => f.id === project.idFolder)

    if (folderIndex === -1) {
      console.error('Folder not found');
      return;
    }

    const projectIndex = folders[folderIndex].items.findIndex((p: IProject) => p.id === project.id)

    if (projectIndex === -1) {
      console.error('Project not found');
      return;
    }

    folders[folderIndex].items[projectIndex] = project

    updateLocalStorage({...localStg, folders })
    this.dispatch(setFolders(localStg.folders))
  }

  public getProject(id: string) {
    const project = this.getProjects().filter((v: IProject) => v.id === id)[0]

    return project
  }

  public getProjects(): any {
    const localStg = getLocalStorage()
    const projects: any[] = localStg.projects

    this.dispatch(setProjects(projects))
  }

  public updateProject(item: IProject) {
    const localStg = getLocalStorage()

    if (item.idFolder !== '') {
      this.deleteProject(item)
      const folders = localStg.folders;
      const folderIndex = localStg.folders.findIndex((f: IFolder) => f.id === item.idFolder)
      const projectIndex = folders[folderIndex].items.findIndex((p: IProject) => p.id === item.id)

      if (projectIndex !== -1) {
        this.updateProjectInFolder(item)
      } else {
        this.addProjectInFolder(item)
      }
      return
    }

    const projects = localStg.projects
    const projectIndex = projects.findIndex((i: IProject) => i.id === item.id)
  
    if (projectIndex !== -1) projects[projectIndex] = item

    this.dispatch(setProjects(projects))
    updateLocalStorage(localStg)
  }

  public deleteProject(project: IProject) {
    const localStg = getLocalStorage()
    const projects = localStg.projects
    const projectIndex = projects.findIndex((p: IProject) => p.id === project.id)

    if (projectIndex !== -1) projects.splice(projectIndex, 1)

    this.dispatch(setProjects(projects))
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

    this.dispatch(setProjects(projects))
    updateLocalStorage(localStg)
  }
}