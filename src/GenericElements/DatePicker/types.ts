export interface IDatePickerProps {
  onSelect: (date: string) => void;
  date: string;
  error: boolean;
}
