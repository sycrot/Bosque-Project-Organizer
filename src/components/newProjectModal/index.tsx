import * as React from 'react'
import { INewProjectModalProps } from './props';
import { Col, Modal, Row } from 'react-bootstrap';
import styles from './styles.module.scss';
import CloseIcon from '@/assets/icons/close-icon.svg'
import Image from 'next/image';
import ButtonDefault from '../commom/buttons/buttonDefault';
import * as yup from "yup";
import { Formik, Form, Field, useFormikContext, useField } from "formik";
import InputDefault from '../commom/inputs/default';
import ColorPicker from '../commom/inputs/colorPicker';
import { FolderService } from '@/services/folderService';
import { IFolder } from '@/types/IFolder';
import Dropdown from '../commom/inputs/dropdown';
import Stages from '../commom/inputs/stages';
import toast, { toastConfig } from 'react-simple-toasts';
import { ProjectService } from '@/services/projectService';
import { IProject } from '@/types/IProject';
import { useDispatch, useSelector } from 'react-redux';
import { getRandomColor } from '@/utils/util';
import { v4 as uuidv4 } from 'uuid';

toastConfig({ theme: 'dark' });

const validationSchema = yup.object().shape({
  title: yup.string().required(),
  color: yup.string(),
  folderId: yup.string(),
  stages: yup.array()
})

export default function NewProjectModal(props: INewProjectModalProps) {
  const [folderOptions, setFolderOptions] = React.useState<any[]>([])
  const dispatch = useDispatch()
  const folderService = new FolderService(dispatch)
  const projectService = new ProjectService(dispatch)
  const folders = useSelector((state: any) => state.foldersReducer)
  const project = props.project ?? undefined

  const getColor = () => {
    const color = getRandomColor()

    if (project) {
      if (project.color && project.color !== '') return project.color
      else return color
    } else {
      return color
    }
  }

  const formInitialValues = {
    title: project ? project.title : '',
    color: getColor(),
    folderId: project ? project.idFolder ?? '' : '',
    stages: project ? project.stages : []
  }

  React.useEffect(() => {
    folderService.getFolders()
  }, [])

  React.useEffect(() => {
    if (Array.isArray(folders)) {
      const options: any = []

      folders?.map((v: IFolder) => {
        options.push({ value: v.id, label: v.title })
      })
  
      setFolderOptions(options)
    }
  }, [folders])

  const onSubmit = (values: any) => {
    if (values.title === '') {
      toast('O campo Título é necessário', { position: 'center', zIndex: 1200, theme: 'info', className: 'toast-warning' })
      return
    }

    const newProject: IProject = {
      id: project?.id,
      title: values.title,
      color: values.color,
      idFolder: values.folderId,
      stages: values.stages,
      created: project?.created,
      lastVisited: project?.lastVisited
    }

    if (project) {
      projectService.updateProject(newProject)
    } else {
      projectService.addProject(newProject)
    }

    props.handleClose()
  }

  const defaultStages: any = [
    {id: uuidv4(), icon: 'Close', title: 'Não iniciado', stage: 0, tasks: []},
    {id: uuidv4(), icon: 'Loading', title: 'Em andamento', stage: 1, tasks: []},
    {id: uuidv4(), icon: 'Config', title: 'Em teste', stage: 2, tasks: []},
    {id: uuidv4(), icon: 'Finish', title: 'Concluído', stage: 3, tasks: []},
  ]

  return (
    <Modal show={props.show} onHide={props.handleClose} centered contentClassName={styles.newProjectModal} animation>
      <Modal.Header className={styles.header}>
        <Modal.Title className={styles.title}>Novo projeto</Modal.Title>
        <button type="button" className={styles.buttonClose} onClick={props.handleClose}><Image src={CloseIcon} alt="Fechar" /></button>
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
                <Col xs={10} md={6}>
                  <InputDefault
                    name={'title'}
                    type={'text'}
                    label={'Título'}
                  />
                </Col>
                <Col xs={2} md={1} className={styles.colColor}>
                  <ColorPicker
                    color={values.color}
                    onChangeComplete={(color: any) => setFieldValue('color', color.hex)}
                    label={'Cor'}
                  />
                </Col>
                <Col md={5} className={`${styles.colDropdown}`}>
                  <Dropdown
                    value={values.folderId}
                    options={folderOptions}
                    onChange={(e: any) => setFieldValue('folderId', e)}
                    label={'Pasta'}
                  />
                </Col>
              </Row>
              <Row style={{ justifyContent: 'space-between' }} className={styles.stages}>
                <h6>Estágios</h6>
                <button type="button" onClick={e => {
                  e.preventDefault()
                  e.stopPropagation()
                  setFieldValue('stages', defaultStages)}
                  }>Estágios padrão</button>
              </Row>
              <Stages value={values.stages} onChange={(e) => setFieldValue('stages', e)} />
            </Modal.Body>
            <Modal.Footer className={styles.footer}>
              <ButtonDefault
                text={'Cancelar'}
                variant={'default'}
                onClick={props.handleClose}
              />
              <ButtonDefault
                text={props.actionText ?? 'Adicionar'}
                variant={'primary'}
                type='submit'
                onClick={() => onSubmit(values)}
              />
            </Modal.Footer>
          </Form>
        )}
      </Formik>
    </Modal>
  )
}