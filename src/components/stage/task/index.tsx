import * as React from 'react';
import styles from './styles.module.scss';
import { ITaskProps } from './props';
import { StageService } from '@/services/stageService';
import { useDispatch, useSelector } from 'react-redux';
import { IStage } from '@/types/IStage';
import { Icons } from '@/components/commom/inputs/iconPicker/icons';
import CheckIcon from '@/assets/icons/check-orange.svg'
import Image from 'next/image';
import { TaskService } from '@/services/taskService';
import ModalComponent from '@/components/commom/modal';
import { ITask } from '@/types/ITask';
import toast, { toastConfig } from 'react-simple-toasts';

toastConfig({ theme: 'dark' });

export default function Task(props: ITaskProps) {
  const dispatch = useDispatch()
  const stageService = new StageService(dispatch)
  const taskService = new TaskService(dispatch)
  const [currentStages, setCurrentStages] = React.useState<IStage[]>()
  const projects = useSelector((s: any) => s.projectsReducer)
  const folders = useSelector((s: any) => s.foldersReducer)
  const [showDeleteTask, setShowDeleteTask] = React.useState(false)

  React.useEffect(() => {
    const getStages = () => {
      const stages = stageService.getStages(props.task.idProject)
      const filter = stages.filter((s: IStage) => s.id !== props.task.idStage)

      setCurrentStages(filter)
    }

    getStages()
  }, [projects, folders])

  const toggleShowDeleteTask = () => {
    setShowDeleteTask(!showDeleteTask)
  }

  const deleteTask = () => {
    taskService.deleteTask(props.task)
  }

  const passStage = (stage: IStage) => {
    taskService.deleteTask(props.task)
    
    const taskToStage: ITask = {
      ...props.task,
      idStage: stage.id
    }

    taskService.addTask(taskToStage)

    toast(`Tarefa movida para o estágio: ${stage.title}`, { position: 'bottom-center', zIndex: 1200, theme: 'info', className: 'toast-success' })
  }

  return (
    <div className={styles.task}>
      <p>{props.task.title}</p>
      <div className={styles.actions}>
        {currentStages?.map(s => (
          <button key={s.id} onClick={() => passStage(s)}><Icons iconName={s.icon} /></button>
        ))}
        <button className={styles.check} onClick={toggleShowDeleteTask}><Image src={CheckIcon} alt="Concluir" /></button>
      </div>

      <ModalComponent
        show={showDeleteTask}
        hide={toggleShowDeleteTask}
        content={<><p>Tem certeza que deseja concluir a tarefa: <b>"{props.task.title}"</b>`?<br /><span style={{color: 'orange'}}>Concluir excluirá a tarefa</span></p></>}
        title={'Concluir tarefa?'}
        actionText={'Concluir'}
        action={deleteTask}
      />
    </div>
  )
}