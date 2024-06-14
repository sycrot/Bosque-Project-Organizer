import * as React from 'react';
import Image from 'next/image'
import styles from './styles.module.scss'
import NoContentImage from '@/assets/nocontent.svg'
import Folder from '@/assets/icons/add-folder-orange.svg'
import Project from '@/assets/icons/add-project-orange.svg'
import NewProjectModal from '../newProjectModal'
import NewFolderModal from '../newFolderModal';

export default function NoContent() {
  const [showNewProjectModal, setShowNewProjectModal] = React.useState(false)
  const [showNewFolderModal, setShowNewFolderModal] = React.useState(false)

  const toggleShowNewProjectModal = () => {
    setShowNewFolderModal(false)
    setShowNewProjectModal(!showNewProjectModal)
  }

  const toggleShowNewFolderModal = () => {
    setShowNewProjectModal(false)
    setShowNewFolderModal(!showNewFolderModal)
  }

  return (
    <div className={styles.noContent}>
      <Image src={NoContentImage} alt="No content" />

      <div className={styles.actions}>
        <button onClick={toggleShowNewFolderModal}><Image src={Folder} alt="Adicionar nova pasta" /><p>Adicionar nova pasta</p></button>
        <button onClick={toggleShowNewProjectModal}><Image src={Project} alt="Adicionar novo projeto" onClick={toggleShowNewProjectModal} /><p>Adicionar novo projeto</p></button>
      </div>

      <NewProjectModal
        show={showNewProjectModal}
        handleClose={toggleShowNewProjectModal}
      />

      <NewFolderModal
        show={showNewFolderModal}
        handleClose={toggleShowNewFolderModal}
      />
    </div>
  )
}