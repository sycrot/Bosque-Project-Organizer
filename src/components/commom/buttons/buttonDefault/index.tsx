import { IButton } from "../IButton";
import styles from './styles.module.scss'

export default function ButtonDefault (props: IButton) {
  return (
    <button className={`${styles.button} ${props.variant === 'primary' ? styles.buttonPrimary : styles.buttonDefault}`}  type={props.type ?? 'button'} onClick={props.onClick}><p>{props.text}</p></button>
  )
}