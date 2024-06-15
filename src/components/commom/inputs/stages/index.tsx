import * as React from 'react';
import { Alert, Col, OverlayTrigger, Row, Tooltip } from "react-bootstrap";
import { IStageProps } from "./props";
import styles from './styles.module.scss'
import * as yup from 'yup'
import { Field, Form, Formik } from "formik";
import InputDefault from "../default";
import Image from "next/image";
import AddIcon from '@/assets/icons/add-icon.svg';
import IconPicker from "../iconPicker";
import { IStage } from '@/types/IStage';
import { v4 as uuidv4 } from 'uuid';
import { Icons } from '../iconPicker/icons';
import EditIcon from '@/assets/icons/edit-icon.svg';
import DeletIcon from '@/assets/icons/delete-icon.svg';
import CheckIcon from '@/assets/icons/complet-icon.svg';
import toast, { toastConfig } from 'react-simple-toasts';

toastConfig({ theme: 'dark' });

const validationSchema = yup.object().shape({
  icon: yup.string(),
  stage: yup.string().required(),
  level: yup.number().min(0),
})

const validationSchemaStage = yup.object().shape({
  title: yup.string().required(),
  stage: yup.number().min(0),
  icon: yup.string()
})


const formInitialValues = {
  icon: 'Finish',
  stage: '',
  level: 0,
}

export default function Stages(props: IStageProps) {
  const [editStage, setEditStage] = React.useState(false)
  const [selectedStage, setSelectedStage] = React.useState<IStage>()
  const [formInitialStage, setFormInitialStage] = React.useState<any>()

  const openEditStage = (stage: IStage) => {
    setSelectedStage(stage)
    setFormInitialStage({
      title: stage.title,
      stage: stage.stage,
      icon: stage.icon
    })
    setEditStage(false)
    setEditStage(true)
  }

  const onSubmit = (values: any) => {
    const newStage = [...props.value]
    const filterLevel = newStage.filter((v: any) => v.stage === values.level)

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

    const stage: IStage = {
      id: uuidv4(),
      title: values.stage,
      stage: values.level,
      tasks: [],
      icon: values.icon,
    }

    newStage.push(stage)
    props.onChange(newStage)
  }

  const handleEditStage = (stage: IStage, values: any) => {
    const stages = [...props.value]
    const currentStage = stages.filter((v: any) => v.id === stage.id)
    const filterLevel = stages.filter((v: any) => {
      if (v.id !== stage.id) {
        if (v.stage === values.stage) {
          return v;
        }
      }
    })

    if (values.title === '') {
      toast('O campo Estágio é necessário', { position: 'center', zIndex: 1200, theme: 'info', className: 'toast-warning' })
      return
    }

    if (filterLevel.length > 0) {
      toast('Já existe um estágio com esse nível', { position: 'center', zIndex: 1200, theme: 'info', className: 'toast-warning' })
      return
    }

    currentStage.map((i: any) => {
      if (i.id === stage.id) {
        i.title = values.title
        i.stage = values.stage
        i.icon = values.icon
      }
    })

    props.onChange(stages)
    setEditStage(!editStage)
  }

  const handleRemoveStage = (stageId: string) => {
    const stages = [...props.value]
    const currentStage = stages.findIndex((v: any) => v.id === stageId)

    if (currentStage !== -1) stages.splice(currentStage, 1)

    props.onChange(stages)
  }

  return (
    <div className={styles.stages}>
      <div className={styles.inputStage}>
        <Formik
          initialValues={formInitialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          {({ errors, touched, values, setFieldValue }) => (
            <Form>
              <Row>
                <Col sm={2}>
                  <IconPicker
                    value={values.icon}
                    onChange={(e: any) => setFieldValue('icon', e)}
                    label={"Ícone"}
                    style={{ zIndex: '999' }}
                  />
                </Col>
                <Col sm={5}>

                  <InputDefault
                    name={'stage'}
                    type={'text'}
                    label={'Estágio'}
                  />
                </Col>
                <Col sm={3} style={{ position: 'relative' }}>
                  <InputDefault
                    name={'level'}
                    type={'number'}
                    label={'Nível'}
                  />
                </Col>
                <Col sm={2}>
                  <button type="button" className={styles.buttonAdd} onClick={() => onSubmit(values)}>
                    <Image src={AddIcon} alt="" />
                  </button>
                </Col>
              </Row>
            </Form>
          )}
        </Formik>
      </div>

      <div className={styles.stagesItems}>
        {props.value.length > 0 && props.value.map((stage: IStage) => (
          <div key={stage.id} className={styles.stageItem}>
            {editStage && selectedStage?.id === stage.id ?
              <>
                <Formik
                  initialValues={formInitialStage}
                  onSubmit={handleEditStage}
                  validationSchema={validationSchemaStage}
                >
                  {({ errors, touched, values, setFieldValue }) => (
                    <Form>
                      <div className={styles.stageItemForm}>
                        <div className={styles.iconValue}>
                          <IconPicker
                            value={values.icon}
                            onChange={(e: any) => setFieldValue('icon', e)}
                            label={""}
                            noPadding
                          />
                        </div>
                        <div>
                          <Field name={'title'} type={'text'} />
                        </div>
                        <div className={styles.stageNumberForm}>
                          <Field name={'stage'} type={'number'} />
                        </div>
                        <div className={styles.actions}>
                          <button type="button" className={styles.actionButton} onClick={() => handleEditStage(stage, values)}><Image src={CheckIcon} alt="Salvar" /></button>
                          <button type="button" className={styles.actionButton} onClick={() => handleRemoveStage(stage.id)}><Image src={DeletIcon} alt="Excluir" /></button>
                        </div>
                      </div>
                    </Form>
                  )}
                </Formik>
              </>
              :
              <>
                <div className={styles.iconValue}>
                  <Icons iconName={stage.icon} />
                </div>
                <div>
                  <p>{stage.title}</p>
                </div>
                <div className={styles.stageNumber}>
                  <p>{stage.stage}</p>
                </div>
                <div className={styles.actions}>
                  <button type="button" className={styles.actionButton} onClick={() => openEditStage(stage)}><Image src={EditIcon} alt="Editar" /></button>
                  <button type="button" className={styles.actionButton} onClick={() => handleRemoveStage(stage.id)}><Image src={DeletIcon} alt="Excluir" /></button>
                </div>
              </>
            }
          </div>
        ))}
      </div>

    </div>
  )
}