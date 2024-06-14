import * as React from 'react';
import styles from './styles.module.scss';
import { IModalProps } from './props';
import { Modal } from 'react-bootstrap';
import CloseIcon from '@/assets/icons/close-icon.svg'
import Image from 'next/image';
import ButtonDefault from '../buttons/buttonDefault';

export default function ModalComponent(props: IModalProps) {
  return (
    <Modal show={props.show} onHide={props.hide} centered contentClassName={styles.modal} animation>
      <Modal.Header className={styles.header}>
        <Modal.Title className={styles.title}>{props.title}</Modal.Title>
        <button type="button" className={styles.buttonClose} onClick={props.hide}><Image src={CloseIcon} alt="Fechar" /></button>
      </Modal.Header>
      <Modal.Body className={styles.body}>
        {props.content}
      </Modal.Body>
      <Modal.Footer className={styles.footer}>
        <ButtonDefault
          text={props.actionCancelText ?? 'Cancelar'}
          variant={'default'}
          onClick={props.hide}
        />
        <ButtonDefault
          text={props.actionText}
          variant={'primary'}
          onClick={props.action}
        />
      </Modal.Footer>
    </Modal>
  )
}