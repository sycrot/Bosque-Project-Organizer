/* eslint-disable react-hooks/exhaustive-deps */
"use client"
import { useDispatch, useSelector } from "react-redux";
import styles from "./page.module.scss";
import * as React from "react";
import { IProject } from "@/types/IProject";
import { ProjectService } from "@/services/projectService";
import { IFolder } from "@/types/IFolder";
import NoContent from "@/components/noContent";
import ContentPage from "@/components/contentPage";
import { createLists, deleteLastVisitedHome, getLocalStorage, lastVisitedHome } from "@/services/storageService";

export default function Home() {
  const [projectsRender, setProjectsRender] = React.useState<IProject[]>([])
  const projects = useSelector((state: any) => state.projectsReducer)
  const folders = useSelector((state: any) => state.foldersReducer)

  React.useEffect(() => {
    const localStg = getLocalStorage()
    !localStg && createLists()

    if (Array.isArray(projects) && Array.isArray(folders)) {
      const projectsInFolder: IProject[] = []

      folders.map((f: IFolder) => {
        f.items?.map((p: IProject) => {
          projectsInFolder.push(p)
        })
      })

      const concat: IProject[] = projects.concat(projectsInFolder)

      const localStg = getLocalStorage()
      const lastVisited = localStg.homeLastVisited

      if (lastVisited !== "") {
        const lastDate = new Date(lastVisited)
        
        concat.map(p => {
          const date = new Date(p.lastVisited ?? '')
  
          if (date > lastDate) {
            deleteLastVisitedHome()
            window.location.assign(`/project/${p.id}`)
          } else {
            lastVisitedHome()
          }
        })
      } else {
        lastVisitedHome()
      }
      

      setProjectsRender(concat)
    }
  }, [projects, folders])

  return (
    <main className={styles.main}>
      {projectsRender.length > 0 ?
        <ContentPage projects={projectsRender} />
        :
        <NoContent />
      }
    </main>
  );
}
