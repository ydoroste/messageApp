export interface ICheckboxPorps {
    isChecked: boolean;
    onValueChange: (value: boolean) => void;  
    text: string;
    disabled: boolean;
    error?: boolean
  }
  