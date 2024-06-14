"use client"
import * as React from 'react'
import Link from 'next/link'
import styles from './styles.module.scss'
import Logo from '@/assets/logo.png'
import Image from 'next/image'
import Bar from '@/assets/icons/bar.png'
import AddProject from '@/assets/icons/add-project-orange.svg'
import AddFolder from '@/assets/icons/add-folder-orange.svg'
import MenuProjectItems from '@/components/menuProjectItems'
import { IDesktopSidebarProps } from './props'

export default function DesktopSidebar(props: IDesktopSidebarProps) {
  return (
    <div className={styles.desktopSidebar}>
      <div className={styles.navbar}>
        <div className={styles.container}>
          <Link href="/">
            <Image src={Logo} alt="Home" />
          </Link>
          <button
            className={styles.buttonMenu}
            onClick={props.toggleShow}
          >
            <Image src={Bar} alt="Menu" />
          </button>
        </div>
      </div>
      <div className={styles.actions}>
        <button
          className={styles.actionButton}
        >
          <Image src={AddFolder} alt="Adicionar pasta" onClick={props.showNewFolder} />
        </button>
        <button
          className={styles.actionButton}
          onClick={props.showNewProject}
        >
          <Image src={AddProject} alt="Adicionar projeto" />
        </button>
      </div>
      <MenuProjectItems itemsToRender={props.itemsToRender} />
    </div>
  )
}