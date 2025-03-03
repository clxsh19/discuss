interface FormProps {
  containerStyle: string;
  labelStyle: string;
  inputStyle: string;
  name: string;
  label: string;
}

export interface TextInputProps extends FormProps{
  placeholder: string;
  onInput?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface TextareaProps extends TextInputProps{
  rowCount: number;
}

export interface MediaInputProps extends FormProps {
  accept: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void; 
}
