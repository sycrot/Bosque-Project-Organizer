import * as React from 'react'
import { IButton } from "../IButton";
import styles from './styles.module.scss'

export default function ButtonDefault (props: IButton) {

  const onClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    props.onClick && props.onClick()
  }
  return (
    <button className={`${styles.button} ${props.variant === 'primary' ? styles.buttonPrimary : styles.buttonDefault}`}  type={props.type ?? 'button'} onClick={onClick}><p>{props.text}</p></button>
  )
}