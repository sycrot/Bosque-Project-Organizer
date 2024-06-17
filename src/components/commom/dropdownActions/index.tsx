import * as React from 'react'
import { IDropdownActionsProps } from "./props";
import styles from './styles.module.scss'

export default function DropdownActions(props: IDropdownActionsProps) {
  const [showActions, setShowActions] = React.useState(false)

  const toggleShowActions = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setShowActions(!showActions)
  }

  return (
    <div className={styles.dropdownActions}>
      <button className={styles.actionButton} style={props.buttonActionStyle} onClick={toggleShowActions}>{props.buttonContent}</button>
      {showActions &&
        <div className={styles.actions} onMouseLeave={toggleShowActions}>
          {props.actions.map((v, index) => (
            <button
              key={index}
              onClick={e => {
                e.preventDefault()
                e.stopPropagation()
                v.function(e)
                setShowActions(false)
              }}>
              {v.title}
            </button>
          ))}
        </div>
      }
    </div>
  )
}