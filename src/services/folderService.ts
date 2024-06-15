import { IFolder } from '@/types/IFolder';
import { v4 as uuidv4 } from 'uuid';
import { getLocalStorage, updateLocalStorage } from './storageService';
import { ProjectService } from './projectService';
import { IProject } from '@/types/IProject';
import { setFolders } from './redux/folders/slice';

export class FolderService {
  private dispatch: any;

  constructor(dispatch: any) {
    this.dispatch = dispatch
  }

  public addFolder(folder: IFolder): void {
    const localStg = getLocalStorage()
    const folders = localStg.folders

    const created = new Date()

    const newFolder: IFolder = {
      ...folder,
      items: [],
      created: created.toISOString(),
      id: uuidv4(),
    }

    folders.push(newFolder)

    this.dispatch(setFolders(folders))
    updateLocalStorage(localStg)
  }

  public getFolder(id: string) {
    const folder = this.getFolders().filter((v: IFolder) => v.id === id)[0]

    return folder
  }

  public getFolders(): any {
    const localStg = getLocalStorage()
    const folders: any[] = localStg.folders

    this.dispatch(setFolders(folders))
    return folders
  }

  public getProjects(): any {
    const localStg = getLocalStorage()
    const folders = localStg.folders
    const projects: IProject[] = []

    folders.map((f: IFolder) => {
      f.items?.map(p => projects.push(p))
    })

    return projects;
  }

  public updateFolder(item: IFolder) {
    const localStg = getLocalStorage()
    const folders = localStg.folders
    const folderIndex = folders.findIndex((f: IFolder) => f.id === item.id);

    if (folderIndex !== -1) folders[folderIndex] = item

    this.dispatch(setFolders(folders))
    updateLocalStorage(localStg)
  }

  public deleteFolder(item: IFolder) {
    const localStg = getLocalStorage()
    const folders = localStg.folders
    const folder = folders.findIndex((v: IFolder) => v.id === item.id)

    if (folder !== -1) folders.splice(folder, 1)

    this.dispatch(setFolders(folders))
    updateLocalStorage(localStg)
  }

  public deleteProject(project: IProject) {
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

    folders[folderIndex].items.splice(projectIndex, 1);

    console.log(folders)

    updateLocalStorage({...localStg, folders })
    this.dispatch(setFolders(localStg.folders))
  }
}