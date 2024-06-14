"use client"
import * as React from 'react'
import ProjectItem from "./projectItem";
import { IMenuProjectItemsProps } from "./props";
import styles from './styles.module.scss'
import { sortItemsByCreatedDate } from '@/utils/util';
import FolderItem from './folderItem';

export default function MenuProjectItems(props: IMenuProjectItemsProps) {
  const [openFolder, setOpenFolder] = React.useState(false)

  const handleOpenFolder = () => {
    setOpenFolder(!openFolder)
  }

  return (
    <div className={styles.menuProjectItems}>
      {sortItemsByCreatedDate(props.itemsToRender)?.map((item: any) => (
        item.stages ?
          <ProjectItem
            key={item.id}
            project={item}
          />
          :
          <FolderItem
            key={item.id}
            folder={item}
            open={openFolder}
            onClick={handleOpenFolder}
          />
      ))}
    </div>
  )
}