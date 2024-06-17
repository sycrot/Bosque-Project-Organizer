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
      created: created.toISOString(),
      lastVisited: created.toISOString()
    }

    if (newProject.stages) {
      newProject.stages = newProject.stages.map(s => ({
        ...s,
        idProject: newProject.id
      }));
    }

    projects.push(newProject)

    this.dispatch(setProjects(projects))
    updateLocalStorage(localStg)
    window.location.assign(`/project/${newProject.id}`)
  }

  public addProjectInFolder(project: IProject) {
    const created = new Date()
    const localStg = getLocalStorage()
    const folder = localStg.folders.filter((v: IFolder) => v.id === project.idFolder)[0]

    const newProject: IProject = {
      ...project,
      id: uuidv4(),
      created: created.toISOString(),
      lastVisited: created.toISOString(),
    }

    if (newProject.stages) {
      newProject.stages = newProject.stages.map(s => ({
        ...s,
        idProject: newProject.id
      }));
    }
    
    folder.items.push(newProject)

    this.dispatch(setFolders(localStg.folders))
    updateLocalStorage(localStg)
    window.location.assign(`/project/${newProject.id}`)
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
    const folderService = new FolderService(this.dispatch)
    const localStg = getLocalStorage()
    if (localStg) {
      const projects = localStg.projects
      const project = projects.filter((v: IProject) => v.id === id)
      const projectInFolder = folderService.getProjects().filter((p: IProject) => p.id === id)
  
      if (project.length > 0) {
        return project[0]
      } else {
        return projectInFolder[0]
      }
    }
    
  }

  public getProjects(): any {
    const localStg = getLocalStorage()
    if (localStg) {
      const projects: any[] = localStg.projects

      this.dispatch(setProjects(projects))
      return projects;
    }
    
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

  public updateLastVisited(item: IProject) {
    console.log(item)
    const localStg = getLocalStorage()
    const projects = localStg.projects
    const lastVisited = new Date()
    const project = projects.filter((p: IProject) => p.id === item.id)
    if (project.length === 0) {
      this.updateLastVisitedInFolder(item)
      this.dispatch(setProjects(projects))
      return
    }

    project[0].lastVisited = lastVisited.toISOString()

    this.dispatch(setProjects(projects))
    updateLocalStorage(localStg)
  }

  public updateLastVisitedInFolder(item: IProject) {
    const localStg = getLocalStorage()
    const folders = localStg.folders
    const folderIndex = folders.findIndex((f: IFolder) => f.id === item.idFolder)
    const lastVisited = new Date()

    if (folderIndex === -1) {
      console.error('Folder not found');
      return;
    }

    const project = folders[folderIndex].items.filter((p: IProject) => p.id === item.id)

    project[0].lastVisited = lastVisited.toISOString()

    this.dispatch(setProjects(folders))
    updateLocalStorage(localStg)
  }
}