import * as React from 'react';
import styles from './styles.module.scss';
import { IStageProps } from './props';
import Image from 'next/image';
import { Icons } from '../commom/inputs/iconPicker/icons';
import AddIcon from '@/assets/icons/add-icon.svg';
import MenuIcon from '@/assets/icons/menu-dots-icon.svg'
import Task from './task';
import { ITask } from '@/types/ITask';

export default function Stage(props: IStageProps) {
  const taskTest: ITask = {
    id: '',
    idProject: props.stage.idProject || '',
    idStage: props.stage.id,
    title: 'teste new proiejc jsjsjd'
  }
  return (
    <div className={styles.stage}>
      <div className={styles.stageHeader}>
        <div className={styles.stageTitle}>
          <Icons iconName={props.stage.icon} />
          <h4>{props.stage.title}</h4>
        </div>
        <div className={styles.actionsHeader}>
          <button><Image src={AddIcon} alt="Adicionar"/></button>
          <button><Image src={MenuIcon} alt="Menu"/></button>
        </div>
      </div>
      <div className={styles.content}>
        <Task task={taskTest} />
      </div>
    </div>
  )
}