import * as React from 'react'
import { Icons } from "./icons";
import { IIconPickerProps } from "./props";
import styles from './styles.module.scss'

export default function IconPicker(props: IIconPickerProps) {
  const [showIcons, setShowIcons] = React.useState(false)
  const icons = ['Close', 'Loading', 'Config', 'Finish']

  const toggleShowIcons = () => {
    setShowIcons(!showIcons)
  }

  return (
    <>
      {props.label !== '' && <div className={styles.labelContainer}><label className={styles.label}>{props.label}</label></div>}
      <div className={`${props.noPadding ? styles.noPadding : ''} ${styles.iconPicker} ${showIcons ? styles.arrowShow : ''}`} style={props.style}>
        <button type="button" className={`${styles.button} ${showIcons ? styles.buttonShow : ''}`} onClick={toggleShowIcons}><Icons iconName={props.value} /></button>
        {showIcons &&
          <div className={styles.dropdown}>
            {icons.map((v, index) => (
              <button
                key={index}
                className={styles.icon}
                type="button"
                onClick={() => {
                  toggleShowIcons()
                  props.onChange(v)
                }}
              >
                <Icons iconName={v} />
              </button>
            ))}
          </div>
        }
      </div>
    </>
  )
}