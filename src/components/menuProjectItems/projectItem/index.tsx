"use client"
import * as React from 'react'
import { IProjectItemProps } from "./props";
import styles from './styles.module.scss'
import EditIcon from '@/assets/icons/edit-icon.svg'
import Image from "next/image";
import MenuDots from '@/assets/icons/menu-dots-icon.svg'
import { IAction } from "@/types/IAction";
import DropdownActions from "@/components/commom/dropdownActions";
import ModalComponent from '@/components/commom/modal';
import { ProjectService } from '@/services/projectService';
import { useDispatch } from 'react-redux';
import { FolderService } from '@/services/folderService';
import NewProjectModal from '@/components/newProjectModal';
import { useRouter } from 'next/navigation';

export default function ProjectItem(props: IProjectItemProps) {
  const [showDeleteModal, setShowDeleteModal] = React.useState(false)
  const [showUpdateModal, setShowUpdateModal] = React.useState(false)
  const dispatch = useDispatch()
  const projectService = new ProjectService(dispatch)
  const folderService = new FolderService(dispatch)
  const router = useRouter()

  const handleDeleteProject = (e: React.MouseEvent) => {
    e.preventDefault()
    toggleShowDeleteModal()
  }

  const toggleShowDeleteModal = () => {
    setShowDeleteModal(!showDeleteModal)
  }

  const toggleShowUpdateModal = () => {
    setShowUpdateModal(!showUpdateModal)
  }

  const actions: IAction[] = [
    { title: 'Excluir', function: handleDeleteProject }
  ]

  const deleteProject = () => {
    if (props.project.idFolder) {
      folderService.deleteProject(props.project)
    } else {
      projectService.deleteProject(props.project)
    }

    if (window.location.href.includes(`${props.project.id}`)) window.location.assign('/')
  }

  const handleLastVisited = () => {
    projectService.updateLastVisited(props.project)
    router.push(`/project/${props.project.id}`)
  }

  return (
    <>
      <div className={styles.projectItem} onClick={handleLastVisited}>
        <span
          className={styles.projectColor}
          style={{ background: props.project.color ?? '#C56B02' }}
        ></span>
        <p>{props.project.title}</p>
        <div className={styles.projectActions}>
          <button className={styles.actionButton} onClick={e => {
            e.preventDefault()
            e.stopPropagation()
            toggleShowUpdateModal()
          }}>
            <Image src={EditIcon} alt="Editar projeto" />
          </button>
          <DropdownActions actions={actions} buttonContent={<Image src={MenuDots} alt="Opções" />} />
        </div>
      </div>
      <NewProjectModal
        show={showUpdateModal}
        handleClose={toggleShowUpdateModal}
        project={props.project}
        actionText={'Atualizar'}
      />
      <ModalComponent
        show={showDeleteModal}
        hide={toggleShowDeleteModal}
        content={<p>Deseja realmente excluir <b>"{props.project.title}"</b> ?</p>}
        action={deleteProject}
        title={'Excluir projeto'}
        actionText='Excluir'
      />
    </>
  )
}