'use client'
import * as React from 'react';
import styles from './styles.module.scss';
import { useParams } from 'next/navigation';
import { IProject } from '@/types/IProject';
import { ProjectService } from '@/services/projectService';
import { useDispatch, useSelector } from 'react-redux';
import Image from 'next/image';
import StageIcon from '@/assets/icons/stage.svg'
import NewStageModal from '@/components/newStageModal';
import Stage from '@/components/stage';
import { sortByLevel } from '@/utils/util';
import EditIcon from '@/assets/icons/edit-icon.svg'
import NewProjectModal from '@/components/newProjectModal';

export default function ProjectPage() {
  const { id } = useParams()
  const dispatch = useDispatch()
  const projectService = new ProjectService(dispatch)
  const [currentProject, setCurrentProject] = React.useState<IProject>({ title: '', color: '', stages: [] })
  const [showNewStage, setShowNewStage] = React.useState(false)
  const [showEditProject, setShowEditProject] = React.useState(false)
  const projects = useSelector((s: any) => s.projectsReducer)
  const folders = useSelector((s: any) => s.foldersReducer)

  React.useEffect(() => {
    const getProject = () => {
      const project = projectService.getProject(id.toString())

      if (project) {
        setCurrentProject(project)
      } else {
        window.location.assign('/')
      }

    }

    getProject()
  }, [id, projects, folders])

  const toggleShowNewStage = () => {
    setShowNewStage(!showNewStage)
  }

  const toggleShowEditProject = () => {
    setShowEditProject(!showEditProject)
  }

  return (
    <section className={styles.projectPage}>
      <title>{currentProject.title}</title>
      <div className={styles.content}>
        <div className={styles.projectHeader}>
          <h3>{currentProject.title}</h3>
          <button onClick={toggleShowEditProject}><Image src={EditIcon} alt="Editar" /></button>
        </div>

        <button className={styles.addStageButton} onClick={toggleShowNewStage}><Image src={StageIcon} alt="Adicionar estágio" /><p>Adicionar estágio</p></button>

        {sortByLevel(currentProject.stages).map(s => (
          <Stage key={s.id} stage={s} project={currentProject} />
        ))}
      </div>

      <NewStageModal
        show={showNewStage}
        hide={toggleShowNewStage}
        project={currentProject ?? []}
      />

      <NewProjectModal
        show={showEditProject}
        handleClose={toggleShowEditProject}
        project={currentProject}
      />
    </section>
  )
}