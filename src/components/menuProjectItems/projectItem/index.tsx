"use client"
import * as React from 'react'
import Link from "next/link";
import { IProjectItemProps } from "./props";
import styles from './styles.module.scss'
import EditIcon from '@/assets/icons/edit-icon.svg'
import Image from "next/image";
import MenuDots from '@/assets/icons/menu-dots-icon.svg'
import { IAction } from "@/types/IAction";
import DropdownActions from "@/components/commom/dropdownActions";
import { Modal } from 'react-bootstrap';
import ModalComponent from '@/components/commom/modal';
import { ProjectService } from '@/services/projectService';
import { useDispatch } from 'react-redux';
import { FolderService } from '@/services/folderService';
import NewProjectModal from '@/components/newProjectModal';

export default function ProjectItem(props: IProjectItemProps) {
  const [showDeleteModal, setShowDeleteModal] = React.useState(false)
  const [showUpdateModal, setShowUpdateModal] = React.useState(false)
  const dispatch = useDispatch()
  const projectService = new ProjectService(dispatch)
  const folderService = new FolderService(dispatch)

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
  }

  return (
    <>
      <Link href="/teste" className={styles.projectItem} onClick={props.onClick}>
        <span
          className={styles.projectColor}
          style={{ background: props.project.color ?? '#C56B02' }}
        ></span>
        <p>{props.project.title}</p>
        <div className={styles.projectActions}>
          <button className={styles.actionButton} onClick={e => {
            e.preventDefault()
            toggleShowUpdateModal()
          }}>
            <Image src={EditIcon} alt="Editar projeto" />
          </button>
          <DropdownActions actions={actions} buttonContent={<Image src={MenuDots} alt="Opções" />} />
        </div>
      </Link>
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