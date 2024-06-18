import * as React from 'react'
import { IDropdownProps } from "./props";
import styles from './styles.module.scss'

export default function Dropdown(props: IDropdownProps) {
  const [show, setShow] = React.useState(false)

  const toggleShow = () => {
    setShow(!show)
  }

  const handleItemName = () => {
    const option = props.options.filter((v:any) => props.value === v.value)

    if (option.length > 0) return option[0].label
  }

  return (
    <>
      <label className={styles.label}>{props.label}</label>
      <div className={styles.dropdown}>
        <button onClick={toggleShow} type={'button'} className={`${styles.button} ${show ? styles.buttonShow : ''}`}>{props.value !== '' ? handleItemName() : 'Selecione'}</button>
        {show &&
          <div className={styles.options}>
            {props.options.map((v: any) => (
              <span className={styles.option} key={v.value} onClick={() => {
                props.onChange(v.value)
                toggleShow()
              }}>{v.label}</span>
            ))}
          </div>
        }
      </div>
    </>

  )
}