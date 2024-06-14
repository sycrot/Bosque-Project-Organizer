import * as React from 'react';
import { IColorPickerProps } from "./props";
import { SketchPicker } from 'react-color';
import styles from './styles.module.scss';
import CloseIcon from '@/assets/icons/close-icon.svg'
import Image from 'next/image';
import { Field } from 'formik';

export default function ColorPicker(props: IColorPickerProps) {
  const [showSelect, setShowSelect] = React.useState(false)

  const toggleShowSelect = () => {
    setShowSelect(!showSelect)
  }
  return (
    <>
      <label className={styles.label}>{props.label}</label>
      <div className={styles.colorPicker}>
        <Field
          className={styles.buttonColor}
          id="color"
          name="color"
          onClick={toggleShowSelect}
          style={{
            background: props.color
          }}
        />
        {showSelect &&
          <div className={styles.colorPickerContainer}>
            <button className={styles.buttonClose} onClick={toggleShowSelect}><Image src={CloseIcon} alt="Fechar" /></button>
            <SketchPicker
              color={props.color}
              onChangeComplete={props.onChangeComplete}
              styles={{
                default: {
                  picker: {
                    backgroundColor: '#1B2428',
                    caretColor: '#1B2428'
                  },
                }
              }}
            />
          </div>
        }
      </div>
    </>
  )
}