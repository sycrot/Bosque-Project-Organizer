import * as React from 'react';
import styles from './styles.module.scss'
import { INewFolderModalProps } from './props';
import { Col, Modal, Row } from 'react-bootstrap';
import CloseIcon from '@/assets/icons/close-icon.svg'
import Image from 'next/image';
import * as yup from 'yup';
import { Form, Formik } from 'formik';
import ButtonDefault from '../commom/buttons/buttonDefault';
import InputDefault from '../commom/inputs/default';
import toast, { toastConfig } from 'react-simple-toasts';
import { IFolder } from '@/types/IFolder';
import { FolderService } from '@/services/folderService';
import { useDispatch } from 'react-redux';

const validationSchema = yup.object().shape({
  title: yup.string().required('O campo Título é necessário')
})

toastConfig({ theme: 'dark' });

export default function NewFolderModal(props: INewFolderModalProps) {
  const dispatch = useDispatch()
  const folderService = new FolderService(dispatch)

  const folder = props.folder ?? undefined

  const formInitialValues = {
    title: folder ? folder.title : '',
  }

  const onSubmit = (values: any) => {
    if (!values.title) {
      toast('O campo Título é necessário', { position: 'center', zIndex: 1200, theme: 'info', className: 'toast-warning' })
      return
    }

    const newFolder: IFolder = {
      id: folder?.id,
      title: values.title,
      items: folder?.items,
      created: folder?.created
    }

    if (folder) {
      folderService.updateFolder(newFolder)
    } else {
      folderService.addFolder(newFolder)
    }

    props.handleClose()
  }

  return (
    <Modal show={props.show} onHide={props.handleClose} centered contentClassName={styles.newFolderModal} animation>
      <Modal.Header className={styles.header}>
        <Modal.Title className={styles.title}>Adicionar nova pasta</Modal.Title>
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
                <Col>
                  <InputDefault
                    name={'title'}
                    type={'text'}
                    label={'Título'}
                  />
                </Col>
              </Row>
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
                onClick={() => onSubmit(values)}
              />
            </Modal.Footer>
          </Form>
        )}
      </Formik>
    </Modal>
  )
}