import * as React from 'react';
import styles from './styles.module.scss';
import { IProjectItemProps } from './props';
import Link from 'next/link';
import ProjectIcon from '@/assets/icons/project-blue.svg'
import Image from 'next/image';


export default function ProjectItem (props: IProjectItemProps) {
  return (
    <Link href={`/project/${props.project.id}`} className={styles.projectItem}>
      <span style={{ background: props.project.color }}></span>
      <Image src={ProjectIcon} alt={props.project.title} />
      <p>{props.project.title}</p>
    </Link>
  )
}