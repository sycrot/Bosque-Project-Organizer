import * as React from 'react'
import { IFolderItemProps } from "./props";
import styles from './styles.module.scss'
import AddProject from '@/assets/icons/add-project.svg'
import Image from "next/image";
import MenuDots from '@/assets/icons/menu-dots-icon.svg'
import ProjectItem from '../projectItem';
import { IAction } from '@/types/IAction';
import { sortItemsByCreatedDate } from '@/utils/util';
import DropdownActions from '@/components/commom/dropdownActions';
import { useDispatch } from 'react-redux';
import { FolderService } from '@/services/folderService';
import ModalComponent from '@/components/commom/modal';
import NewFolderModal from '@/components/newFolderModal';
import NewProjectModal from '@/components/newProjectModal';
import { IProject } from '@/types/IProject';
import { useParams, useRouter } from 'next/navigation';

export default function FolderItem(props: IFolderItemProps) {
  const [showDeleteModal, setShowDeleteModal] = React.useState(false)
  const [showUpdateModal, setShowUpdateModal] = React.useState(false)
  const [showNewProjectModal, setShowNewProjectModal] = React.useState(false)
  const dispatch = useDispatch()
  const folderService = new FolderService(dispatch)
  const router = useRouter()
  const [openFolder, setOpenFolder] = React.useState(false)

  const toggleOpenFolder = () => {
    setOpenFolder(!openFolder)
  }

  const handleDeleteFolder = (e: React.MouseEvent) => {
    e.preventDefault()
    toggleShowDeleteModal()
  }

  const toggleShowDeleteModal = () => {
    setShowDeleteModal(!showDeleteModal)
  }

  const toggleShowUpdateModal = () => {
    setShowUpdateModal(!showUpdateModal)
  }

  const toggleShowNewProjectModal = (e?: React.MouseEvent) => {
    e?.preventDefault()
    e?.stopPropagation()
    setShowNewProjectModal(!showNewProjectModal)
  }

  const handleEditItem = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    toggleShowUpdateModal()
  }

  const actions: IAction[] = [
    { title: 'Editar', function: handleEditItem },
    { title: 'Excluir', function: handleDeleteFolder },
  ]

  const deleteFolder = () => {
    folderService.deleteFolder(props.folder)
  }

  const projectInit: IProject = {
    idFolder: props.folder.id,
    title: '',
    stages: [],
    color: ''
  }

  return (
    <>
      <div
        className={`${styles.folderItem}`}
      >
        <div className={`${styles.folderItemHeader} ${openFolder ? styles.collapsed : ''}`} onClick={toggleOpenFolder}>
          <p>{props.folder.title}</p>
          <div className={styles.projectActions}>
            <button className={styles.actionButton} onClick={toggleShowNewProjectModal}><Image src={AddProject} alt="Adicionar projeto" /></button>
            <DropdownActions
              actions={actions}
              buttonContent={<Image src={MenuDots} alt="Opções" />}
            />
          </div>
        </div>
        {openFolder &&
          <div className={styles.projectItems}>
            {props.folder.items && props.folder.items.length > 0 ?
              sortItemsByCreatedDate(props.folder.items ?? [])?.map(p => (
                <ProjectItem
                  key={p.id}
                  project={p}
                />
              ))
              :
              <span className={styles.dontProjects}>Nenhum um projeto nesta pasta</span>
            }
          </div>
        }
      </div>
      <ModalComponent
        show={showDeleteModal}
        hide={toggleShowDeleteModal}
        content={<p>Deseja realmente excluir <b>"{props.folder.title}"</b> e todo o seu conteúdo?</p>}
        action={deleteFolder}
        title={'Excluir pasta'}
        actionText='Excluir'
      />
      <NewFolderModal
        show={showUpdateModal}
        handleClose={toggleShowUpdateModal}
        folder={props.folder}
        actionText='Atualizar'
      />
      <NewProjectModal
        show={showNewProjectModal}
        handleClose={toggleShowNewProjectModal}
        project={projectInit}
      />
    </>
  )
}