import { MediaInputProps } from "@/interface/ui/FormProps";

export const MedianInput = ({
  containerStyle,
  labelStyle,
  inputStyle,
  name,
  label,
  accept,
  onChange
} : MediaInputProps) => {
  return (
    <div className={containerStyle}>
      <label htmlFor={name} className={labelStyle}>
        {label}
      </label>
      <input
        type="file"
        id={name}
        name={name}
        accept={accept}
        onChange={onChange}
        className={inputStyle}
      />
    </div>
  )
}
