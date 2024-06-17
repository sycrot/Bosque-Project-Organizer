import * as React from 'react'
import { IProject } from "@/types/IProject";

export interface IProjectItemProps {
  project: IProject;
  style?: React.CSSProperties
}