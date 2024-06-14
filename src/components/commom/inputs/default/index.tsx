import { Field } from "formik";
import { IInput } from "./props";
import styles from './styles.module.scss'

export default function InputDefault(props: IInput) {
  return (
    <>
      <div className={styles.labelContainer}>
        <label className={styles.label}>{props.label}</label>
        <span>{props.error}</span>
      </div>
      <Field name={props.name} type={props.type} className={styles.input} />
    </>
  )
}