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

export default function Stage(props: IStageProps) {
  const [showNewTask, setShowNewTask] = React.useState(false)
  const projects = useSelector((s: any) => s.projectsReducer)
  const folders = useSelector((s: any) => s.foldersReducer)
  const [tasks, setTasks] = React.useState<ITask[]>()
  const dispatch = useDispatch()
  const tasksService = new TaskService(dispatch)
  const [showDeleteModal, setShowDeleteModal] = React.useState(false)

  const toggleShowNewTask = () => {
    setShowNewTask(!showNewTask)
  }

  React.useEffect(() => {
    const getTasks = () => {
      const tasks = tasksService.getTasks(props.stage)
      console.log(tasks)
      setTasks(tasks)
    }

    getTasks()
  }, [projects, folders])

  const toggleShowDeleteModal = () => {
    setShowDeleteModal(!showDeleteModal)
  }

  const handleDeleteProject = (e: React.MouseEvent) => {
    e.preventDefault()
    toggleShowDeleteModal()
  }

  const actions: IAction[] = [
    { title: 'Excluir', function: handleDeleteProject }
  ]

  const deleteStage = () => {

  }

  return (
    <div className={styles.stage}>
      <div className={styles.stageHeader}>
        <div className={styles.stageTitle}>
          <Icons iconName={props.stage.icon} />
          <h4>{props.stage.title}</h4>
        </div>
        <div className={styles.actionsHeader}>
          <button onClick={toggleShowNewTask}><Image src={AddIcon} alt="Adicionar" /></button>
          <DropdownActions actions={actions} buttonContent={<Image src={MenuIcon} alt="Opções" />} />
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
        content={<p>Deseja realmente excluir <b>"{props.stage.title}"</b>?</p>}
        action={deleteStage}
        title={'Excluir estágio?'}
        actionText='Excluir'
      />
    </div>
  )
}