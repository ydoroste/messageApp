export interface IPhoneNumberInputProps {
  value: string;
  onChangePhoneNumber: (...event: any[]) => void;
  onChangeFormattedPhoneNumber: (...event: any[]) => void;
  onChangeCountry: (country: any) => void;
  error: boolean
  country: any;

}
