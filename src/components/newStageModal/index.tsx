import * as React from 'react'
import { Form, Formik } from "formik";
import Stages from "../commom/inputs/stages";
import ModalComponent from "../commom/modal";
import { INewStageModalProps } from "./props";
import { Col, Modal, Row } from "react-bootstrap";
import IconPicker from "../commom/inputs/iconPicker";
import InputDefault from "../commom/inputs/default";
import * as yup from 'yup'
import ButtonDefault from '../commom/buttons/buttonDefault';
import styles from './styles.module.scss'
import Image from 'next/image';
import CloseIcon from '@/assets/icons/close-icon.svg'
import toast, { toastConfig } from 'react-simple-toasts';
import { StageService } from '@/services/stageService';
import { useDispatch } from 'react-redux';
import { IStage } from '@/types/IStage';

toastConfig({ theme: 'dark' });

const validationSchema = yup.object().shape({
  icon: yup.string(),
  stage: yup.string().required(),
  level: yup.number().min(0),
})

const formInitialValues = {
  icon: 'Finish',
  stage: '',
  level: 0,
}

export default function NewStageModal(props: INewStageModalProps) {
  const [formInitialStage, setFormInitialStage] = React.useState<any>()
  const dispatch = useDispatch()
  const stageService = new StageService(dispatch)

  const onSubmit = (values: any) => {
    const filterLevel = props.project.stages.filter((v: any) => v.stage === values.level) 

    if (values.stage === '') {
      toast('O campo Estágio é necessário', { position: 'center', zIndex: 1200, theme: 'info', className: 'toast-warning' })
      return
    }

    if (values.level < 0) {
      toast('O nível deve ser maior ou igual á 0', { position: 'center', zIndex: 1200, theme: 'info', className: 'toast-warning' })
      return
    }

    if (filterLevel.length > 0) {
      toast('Já existe um estágio com esse nível', { position: 'center', zIndex: 1200, theme: 'info', className: 'toast-warning' })
      return
    }

    const newStage: IStage = {
      id: '',
      title: values.stage,
      stage: values.level,
      tasks: [],
      icon: values.icon,
      idProject: props.project.id,
    }

    stageService.addStage(newStage)
    props.hide()
  }

  return (
    <>

      <Modal show={props.show} onHide={props.hide} centered contentClassName={styles.modalNewStage} animation>
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
                  <Col sm={2}>
                    <IconPicker
                      value={values.icon}
                      onChange={(e: any) => setFieldValue('icon', e)}
                      label={"Ícone"}
                      style={{ zIndex: '999' }}
                    />
                  </Col>
                  <Col sm={6}>

                    <InputDefault
                      name={'stage'}
                      type={'text'}
                      label={'Estágio'}
                    />
                  </Col>
                  <Col sm={4} style={{ position: 'relative' }}>
                    <InputDefault
                      name={'level'}
                      type={'number'}
                      label={'Nível'}
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
    </>
  )
}