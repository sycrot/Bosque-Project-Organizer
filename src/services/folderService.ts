import { IFolder } from '@/types/IFolder';
import { v4 as uuidv4 } from 'uuid';
import { getLocalStorage, updateLocalStorage } from './storageService';

export class FolderService {
  public addFolder(folder: IFolder): void {
    const localStg = getLocalStorage()
    const folders = localStg.folders

    const created = new Date()

    const newFolder: IFolder = {
      ...folder,
      created: created.toISOString(),
      id: uuidv4(),
    }

    folders.push(newFolder)

    updateLocalStorage(localStg)
  }

  public getFolder(id: string) {
    const folder = this.getFolders().filter((v: IFolder) => v.id === id)[0]

    return folder
  }

  public getFolders() {
    const localStg = getLocalStorage()
    const folders: any[] = localStg.folders

    return folders
  }

  public updateFolder(item: IFolder) {
    const localStg = getLocalStorage()
    const folders = localStg.folders

    folders.map((v: IFolder) => {
      if (v.id === item.id) {
        v = item
      }
    })

    updateLocalStorage(localStg)
  }

  public deleteFolder(id: string) {
    const localStg = getLocalStorage()
    const folders = localStg.folders
    const folder = folders.findIndex((v: IFolder) => v.id === id)

    if (folder !== -1) folders.splice(folder, 1)

    updateLocalStorage(localStg)
  }
}