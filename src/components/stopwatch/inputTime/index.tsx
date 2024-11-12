import * as React from 'react';
import styles from './styles.module.scss';
import { IInputTimeProps } from './props';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

export default function InputTime(props: IInputTimeProps) {
  const {
    value,
    setValue,
    max,
    editMode
  } = props;

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (max && +value >= max)
      setValue(60);
    else
      setValue(+e.target.value)
  }

  const handleSetValue = (toAdd: boolean) => {
    if (toAdd) {
      if (max && +value < max)
        setValue(+value + 1);
      else
        setValue(+value + 1);
    } else {
      if (+value !== 0)
        setValue(+value - 1);
    }
  }

  return (
    <div className={styles.inputTime}>
      {editMode &&
        <button
          onClick={() => handleSetValue(true)}
        >
          <FaChevronUp size={12} />
        </button>
      }
      <input
        type="number"
        value={value.toString().padStart(2, "0")}
        min={0}
        onChange={handleInput}
        disabled={!editMode}
      />
      {editMode &&
        <button
          onClick={() => handleSetValue(false)}
        >
          <FaChevronDown size={12} />
        </button>
      }
    </div>
  )
}