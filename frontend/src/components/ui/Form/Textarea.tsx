import { TextareaProps } from "@/interface/ui/FormProps";

const Textarea = ({
  containerStyle,
  labelStyle,
  inputStyle,
  name,
  label,
  placeholder,
  rowCount
} : TextareaProps) => {
  return (
    <div className={containerStyle}>
      <label htmlFor={name} className={labelStyle}>
        {label}
      </label>
      <textarea
        id={name}
        name={name}
        className={inputStyle}
        placeholder={placeholder}
        rows={rowCount}
        required
      />
    </div>
  )
}

export default Textarea;
