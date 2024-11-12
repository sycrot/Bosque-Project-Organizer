export interface IInputTimeProps {
  value: number;
  setValue: (value: number) => void;
  max?: number;
  editMode: boolean;
}