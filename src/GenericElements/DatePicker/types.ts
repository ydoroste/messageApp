export interface IDatePickerProps {
  onSelect: (date: Date) => void;
  date?: Date;
  error: boolean;
  title: string;
  format: string
}
