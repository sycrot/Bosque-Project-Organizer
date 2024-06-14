import { IFolder } from "@/types/IFolder";

export interface IFolderItemProps {
  folder: IFolder;
  open: boolean;
  onClick: () => void;
}