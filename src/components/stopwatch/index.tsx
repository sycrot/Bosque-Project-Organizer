/* eslint-disable react/jsx-no-undef */
import * as React from "react";
import { IStopwatchProps } from "./props";
import styles from './styles.module.scss';
import { FaPlay, FaPause, FaCheck } from 'react-icons/fa';
import { MdModeEdit } from 'react-icons/md'
import InputTime from "./inputTime";
import { useDispatch } from "react-redux";
import { ProjectService } from "@/services/projectService";

export default function Stopwatch(props: IStopwatchProps) {
  const {
    project
  } = props;
  const [time, setTime] = React.useState(0);
  const [isRunning, setIsRunning] = React.useState(false);
  const [minutes, setMinutes] = React.useState(0);
  const [hours, setHours] = React.useState(0);
  const [seconds, setSeconds] = React.useState(0);
  const dispatch = useDispatch()
  const projectService = new ProjectService(dispatch);
  const [showEditTime, setShowEditTime] = React.useState(false);

  React.useEffect(() => {
    setTime(project.workingTime);
  }, [project.workingTime])

  React.useEffect(() => {
    let intervalId: any;

    if (isRunning) {
      intervalId = setInterval(() => setTime(time + 1), 10);
    }

    return () => clearInterval(intervalId);
  }, [isRunning, time]);

  React.useEffect(() => {
    setHours(Math.floor(time / 360000));
    setMinutes(Math.floor((time % 360000) / 6000));
    setSeconds(Math.floor((time % 6000) / 100));
  }, [time]);

  React.useEffect(() => {
    const newTime = hours * 360000 + minutes * 6000 + seconds * 100;
    setTime(newTime);
  }, [hours, minutes, seconds]);

  React.useEffect(() => {
    if (seconds === 59) {
      projectService.updateTimeProject(project, time);
    }
  }, [seconds])

  /* const milliseconds = time % 100; */

  const startAndStop = () => {
    if (isRunning) {
      projectService.updateTimeProject(project, time);
    }

    setIsRunning(!isRunning);
  };

  const reset = () => {
    setTime(0);
    setHours(0);
    setMinutes(0);
    setSeconds(0);
    /* setShowResetModal(false); */
  };

  const toggleShowEditTime = () => {
    setIsRunning(false);
    setShowEditTime(!showEditTime);
  }

  const handleEditTime = () => {
    projectService.updateTimeProject(project, time);
    toggleShowEditTime();
  }

  return (
    <div className={styles.stopwatch}>
      <div className={styles.time}>
        <InputTime
          value={hours}
          setValue={setHours}
          editMode={showEditTime}
        />
        <span>:</span>
        <InputTime
          value={minutes}
          setValue={setMinutes}
          max={60}
          editMode={showEditTime}
        />
        <span>:</span>
        <InputTime
          value={seconds}
          setValue={setSeconds}
          max={60}
          editMode={showEditTime}
        />
      </div>
      <div className={styles.buttons}>
        {showEditTime ?
          <button onClick={handleEditTime}>
            <FaCheck size={16} />
          </button>
          :
          <button onClick={toggleShowEditTime}>
            <MdModeEdit size={20} />
          </button>
        }
        <button
          onClick={startAndStop}
          disabled={showEditTime}
        >
          {isRunning ? <FaPause size={16} /> : <FaPlay size={16} />}
        </button>
        {/* <button onClick={() => setShowResetModal(true)}>
          <FaHistory size={16} />
        </button> */}
      </div>
    </div>
  )
}