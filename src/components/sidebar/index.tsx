"use client"
import * as React from 'react'
import Image from "next/image";
import DesktopSidebar from "./desktopSidebar";
import MobileNavbar from "./mobileNavbar";
import { ISidebarProps } from "./props";
import styles from './styles.module.scss'
import Bar from '@/assets/icons/bar.png'
import NewProjectModal from '../newProjectModal';
import { ProjectService } from '@/services/projectService';
import { FolderService } from '@/services/folderService';
import { useDispatch, useSelector } from 'react-redux';
import NewFolderModal from '../newFolderModal';

export default function Sidebar(props: ISidebarProps) {
  const [show, setShow] = React.useState(true)
  const [showNewProject, setShowNewProject] = React.useState(false)
  const [showNewFolder, setShowNewFolder] = React.useState(false)
  const [itemsToRender, setItemsToRender] = React.useState<any[]>([])
  const projects = useSelector((state: any) => state.projectsReducer)
  const folders = useSelector((state: any) => state.foldersReducer)
  const dispatch = useDispatch()

  const projectService = new ProjectService(dispatch)
  const folderService = new FolderService(dispatch)

  React.useEffect(() => {
    projectService.getProjects()
    folderService.getFolders()
  }, [])

  React.useEffect(() => {
    if (Array.isArray(projects) && Array.isArray(folders)) setItemsToRender([...projects, ...folders])
  }, [projects, folders])

  const toggleShow = () => {
    setShow(!show)
  }

  const toggleShowNewProject = () => {
    setShowNewProject(!showNewProject)
  }

  const toggleShowNewFolder = () => {
    setShowNewFolder(!showNewFolder)
  }

  return (
    <>
      <MobileNavbar
        showNewProject={toggleShowNewProject}
        itemsToRender={itemsToRender}
        showNewFolder={toggleShowNewFolder}
      />
      {show ?
        <div className={styles.sidebar}>
          <DesktopSidebar
            toggleShow={toggleShow}
            showNewProject={toggleShowNewProject}
            itemsToRender={itemsToRender}
            showNewFolder={toggleShowNewFolder}
          />
        </div>
        :
        <div className={styles.dontShow}>
          <button
            className={styles.buttonMenu}
            onClick={toggleShow}
          >
            <Image src={Bar} alt="Menu" />
          </button>
        </div>
      }

      <NewProjectModal
        show={showNewProject}
        handleClose={toggleShowNewProject}
      />

      <NewFolderModal
        show={showNewFolder}
        handleClose={toggleShowNewFolder}
      />
    </>

  )
}