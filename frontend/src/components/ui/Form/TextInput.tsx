import { TextInputProps } from "@/interface/ui/FormProps";

const TextInput = ({
  containerStyle,
  labelStyle,
  inputStyle,
  name,
  label,
  placeholder,
  onInput
} : TextInputProps) => {
  return (
    <div className={containerStyle}>
      <label htmlFor={name} className={labelStyle}>
        {label}
      </label>
      <input
        type="text"
        id={name}
        name={name}
        onInput={onInput}
        className={inputStyle}
        placeholder={placeholder}
        required
      />
    </div>
  )
}

export default TextInput;
