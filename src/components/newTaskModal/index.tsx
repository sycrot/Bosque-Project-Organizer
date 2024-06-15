import * as React from 'react';
import { INewTaskModal } from './props';
import { Col, Modal, Row } from 'react-bootstrap';
import { Form, Formik } from 'formik';
import IconPicker from '../commom/inputs/iconPicker';
import InputDefault from '../commom/inputs/default';
import ButtonDefault from '../commom/buttons/buttonDefault';
import styles from './styles.module.scss'
import Image from 'next/image';
import CloseIcon from '@/assets/icons/close-icon.svg';
import * as yup from 'yup';
import Dropdown from '../commom/inputs/dropdown';
import { StageService } from '@/services/stageService';
import { useDispatch } from 'react-redux';
import { IStage } from '@/types/IStage';
import { Icons } from '../commom/inputs/iconPicker/icons';
import toast, { toastConfig } from 'react-simple-toasts';
import { TaskService } from '@/services/taskService';
import { ITask } from '@/types/ITask';

toastConfig({ theme: 'dark' });

const validationSchema = yup.object().shape({
  title: yup.string().required(),
  stage: yup.string().required()
})

export default function NewTaskModal(props: INewTaskModal) {
  const dispatch = useDispatch()
  const stageService = new StageService(dispatch)
  const taskService = new TaskService(dispatch)
  const [stageOptions, setStageOptions] = React.useState([])

  React.useEffect(() => {
    const getOptionsStages = () => {
      const options: any = []
      const stages: IStage[] = stageService.getStages(props.stage.idProject ?? '')

      stages.map(s => {
        options.push({ value: s.id,  label: <span><Icons iconName={s.icon} /> {s.title}</span> })
      })

      setStageOptions(options)
    }

    getOptionsStages()
  }, [props.stage.id])

  const formInitialValues = {
    title: '',
    stage: props.stage.id
  }

  const onSubmit = (values: any) => {
    if (values.title === '') {
      toast('O campo Título é necessário', { position: 'center', zIndex: 1200, theme: 'info', className: 'toast-warning' })
      return
    }

    const newTask: ITask = {
      id: '',
      idProject: props.stage.idProject ?? '',
      idStage: values.stage,
      title: values.title
    }

    taskService.addTask(newTask)
    props.hide()
  }

  return (
    <Modal show={props.show} onHide={props.hide} centered contentClassName={styles.modalNewTask} animation>
      <Modal.Header className={styles.header}>
        <Modal.Title className={styles.title}>Novo estágio</Modal.Title>
        <button type="button" className={styles.buttonClose} onClick={props.hide}><Image src={CloseIcon} alt="Fechar" /></button>
      </Modal.Header>

      <Formik
        initialValues={formInitialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {({ errors, touched, values, setFieldValue }) => (
          <Form>
            <Modal.Body className={styles.body}>
              <Row>
                <Col sm={7}>
                  <InputDefault
                    name={'title'}
                    type={'text'}
                    label={'Título'}
                  />
                </Col>
                <Col sm={5} style={{ position: 'relative' }}>
                  <Dropdown
                    value={values.stage}
                    options={stageOptions}
                    onChange={(e: any) => setFieldValue('stage', e)}
                    label={'Estágio'}
                  />
                </Col>
              </Row>
            </Modal.Body>
            <Modal.Footer className={styles.footer}>
              <ButtonDefault
                text={'Cancelar'}
                variant={'default'}
                onClick={props.hide}
              />
              <ButtonDefault
                text={'Adicionar'}
                variant={'primary'}
                onClick={() => onSubmit(values)}
              />
            </Modal.Footer>
          </Form>
        )}
      </Formik>
    </Modal>
  )
}