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

export default function ProjectPage() {
  const { id } = useParams()
  const dispatch = useDispatch()
  const projectService = new ProjectService(dispatch)
  const [currentProject, setCurrentProject] = React.useState<IProject>({ title: '', color: '', stages: [] })
  const [showNewStage, setShowNewStage] = React.useState(false)
  const projects = useSelector((s: any) => s.projectsReducer)
  const folders = useSelector((s: any) => s.foldersReducer)

  React.useEffect(() => {
    const getProject = () => {
      const project = projectService.getProject(id.toString())

      console.log(project)

      setCurrentProject(project)
    }

    getProject()
  }, [id, projects, folders])

  const toggleShowNewStage = () => {
    setShowNewStage(!showNewStage)
  }

  return (
    <section className={styles.projectPage}>
      <div className={styles.content}>
        <h3>{currentProject.title}</h3>
        <button className={styles.addStageButton} onClick={toggleShowNewStage}><Image src={StageIcon} alt="Adicionar estágio" /><p>Adicionar estágio</p></button>

        {currentProject.stages.map(s => (
          <Stage key={s.id} stage={s} />
        ))}
      </div>

      <NewStageModal
        show={showNewStage}
        hide={toggleShowNewStage}
        project={currentProject ?? []}
      />
    </section>
  )
}