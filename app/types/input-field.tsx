export type InputFieldProps = {
  name: string;
  label: string;
  maxLength?: number;
  minLength?: number;
  type: string;
  placeholder: string;
  value: string;
  required: boolean;
  onChange: (value: string) => void;
}