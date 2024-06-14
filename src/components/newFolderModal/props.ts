import { IFolder } from "@/types/IFolder";

export interface INewFolderModalProps {
  show: boolean;
  handleClose: () => void;
  folder?: IFolder;
  actionText?: string;
}