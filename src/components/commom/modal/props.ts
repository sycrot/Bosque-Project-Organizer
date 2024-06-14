import * as React from 'react'

export interface IModalProps {
  show: boolean,
  hide: () => void,
  content: React.ReactNode,
  action: () => void,
  title: string;
  actionText: string;
  actionCancelText?: string;
}