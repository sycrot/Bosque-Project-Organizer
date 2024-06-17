import * as React from 'react'
import { IAction } from "@/types/IAction";

export interface IDropdownActionsProps {
  actions: IAction[];
  buttonContent: React.ReactNode,
  buttonActionStyle?: any;
}