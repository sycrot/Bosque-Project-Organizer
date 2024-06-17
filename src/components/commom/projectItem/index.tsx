import * as React from 'react';
import styles from './styles.module.scss';
import { IProjectItemProps } from './props';
import Link from 'next/link';
import ProjectIcon from '@/assets/icons/project-blue.svg'
import Image from 'next/image';
import { ProjectService } from '@/services/projectService';
import { useDispatch } from 'react-redux';


export default function ProjectItem (props: IProjectItemProps) {
  const dispatch = useDispatch()
  const projectService = new ProjectService(dispatch)

  const onClick = () => {
    projectService.updateLastVisited(props.project)
  }

  return (
    <Link href={`/project/${props.project.id}`} className={styles.projectItem} style={props.style} onClick={onClick}>
      <span style={{ background: props.project.color }}></span>
      <Image src={ProjectIcon} alt={props.project.title} />
      <p>{props.project.title}</p>
    </Link>
  )
}