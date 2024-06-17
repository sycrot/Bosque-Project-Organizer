import * as React from 'react';
import styles from './styles.module.scss';
import { IStageProps } from './props';
import Image from 'next/image';
import { Icons } from '../commom/inputs/iconPicker/icons';
import AddIcon from '@/assets/icons/add-icon.svg';
import MenuIcon from '@/assets/icons/menu-dots-icon.svg'
import Task from './task';
import { ITask } from '@/types/ITask';
import NewTaskModal from '../newTaskModal';
import { useDispatch, useSelector } from 'react-redux';
import { TaskService } from '@/services/taskService';
import DropdownActions from '../commom/dropdownActions';
import { IAction } from '@/types/IAction';
import ModalComponent from '../commom/modal';
import { StageService } from '@/services/stageService';
import NewStageModal from '../newStageModal';

export default function Stage(props: IStageProps) {
  const [showNewTask, setShowNewTask] = React.useState(false)
  const projects = useSelector((s: any) => s.projectsReducer)
  const folders = useSelector((s: any) => s.foldersReducer)
  const [tasks, setTasks] = React.useState<ITask[]>()
  const dispatch = useDispatch()
  const tasksService = new TaskService(dispatch)
  const stageService = new StageService(dispatch)
  const [showDeleteModal, setShowDeleteModal] = React.useState(false)
  const [showUpdateModal, setShowUpdateModal] = React.useState(false)

  const toggleShowNewTask = () => {
    setShowNewTask(!showNewTask)
  }

  React.useEffect(() => {
    const getTasks = () => {
      const tasks = tasksService.getTasks(props.stage)

      setTasks(tasks)
    }

    getTasks()
  }, [projects, folders])

  const toggleShowDeleteModal = () => {
    setShowDeleteModal(!showDeleteModal)
  }

  const toggleShowUpdateModal = () => {
    setShowUpdateModal(!showUpdateModal)
  }

  const handleDeleteStage = (e: React.MouseEvent) => {
    e.preventDefault()
    toggleShowDeleteModal()
  }

  const handleUpdateStage = (e: React.MouseEvent) => {
    e.preventDefault()
    toggleShowUpdateModal()
  }

  const actions: IAction[] = [
    { title: 'Editar', function: handleUpdateStage },
    { title: 'Excluir', function: handleDeleteStage },
  ]

  const deleteStage = () => {
    stageService.removeStage(props.stage)
    toggleShowDeleteModal()
  }

  return (
    <div className={styles.stage}>
      <div className={styles.stageHeader}>
        <div className={styles.stageTitle}>
          <Icons iconName={props.stage.icon} />
          <h4>{props.stage.title}</h4>
        </div>
        <div className={styles.actionsHeader}>
          <button onClick={toggleShowNewTask} className={styles.buttonAdd}><Image src={AddIcon} alt="Adicionar" /></button>
          <DropdownActions actions={actions} buttonContent={<Image src={MenuIcon} alt="Opções" />} buttonActionStyle={{ height: '18px', display: 'flex', alignItems: 'center' }} />
        </div>
      </div>
      <div className={styles.content}>
        {tasks ?
          tasks.map(t => (
            <Task key={t.id} task={t} />
          ))
          :
          <span>Nenhuma tarefa</span>
        }
      </div>

      <NewTaskModal
        show={showNewTask}
        hide={toggleShowNewTask}
        stage={props.stage}
      />

      <ModalComponent
        show={showDeleteModal}
        hide={toggleShowDeleteModal}
        content={<p>Deseja realmente excluir <b>{`"${props.stage.title}"`}</b> e todo o seu conteúdo?</p>}
        action={deleteStage}
        title={'Excluir estágio?'}
        actionText='Excluir'
      />

      <NewStageModal
        project={props.project}
        show={showUpdateModal}
        hide={toggleShowUpdateModal}
        stage={props.stage}
      />
    </div>
  )
}