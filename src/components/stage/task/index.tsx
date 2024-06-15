import * as React from 'react';
import styles from './styles.module.scss';
import { ITaskProps } from './props';
import { StageService } from '@/services/stageService';
import { useDispatch } from 'react-redux';
import { IStage } from '@/types/IStage';
import { Icons } from '@/components/commom/inputs/iconPicker/icons';
import CheckIcon from '@/assets/icons/check-orange.svg'
import Image from 'next/image';

export default function Task (props: ITaskProps) {
  const dispatch = useDispatch()
  const stageService = new StageService(dispatch)
  const [currentStages, setCurrentStages] = React.useState<IStage[]>()

  React.useEffect(() => {
    const getStages = () => {
      const stages = stageService.getStages(props.task.idProject)
      const filter = stages.filter((s: IStage) => s.id !== props.task.idStage)

      setCurrentStages(filter)
    }

    getStages()
  }, [])

  return (
    <div className={styles.task}>
      <p>{props.task.title}</p>
      <div className={styles.actions}>
        {currentStages?.map(s => (
          <button key={s.id}><Icons iconName={s.icon} /></button>
        ))}
        <button className={styles.check}><Image src={CheckIcon} alt="Concluir"/></button>
      </div>
    </div>
  )
}