"use client"
import * as React from 'react'
import ProjectItem from "./projectItem";
import { IMenuProjectItemsProps } from "./props";
import styles from './styles.module.scss'
import { sortItemsByCreatedDate } from '@/utils/util';
import FolderItem from './folderItem';

export default function MenuProjectItems(props: IMenuProjectItemsProps) {
  return (
    <div className={styles.menuProjectItems}>
      {props.itemsToRender.length === 0 && <p className={styles.notFound}>Nenhum projeto ou pasta</p>}
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
          />
      ))}
    </div>
  )
}