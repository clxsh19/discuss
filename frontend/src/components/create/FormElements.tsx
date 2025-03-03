interface InputFieldProps {
  label: string;
  name: string;
  placeholder?: string;
}

interface InputTextFieldProps extends InputFieldProps {
  onInput?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

interface InputTextareaFieldProps extends InputFieldProps {
  rowCount: number;
}

export const InputTextField = ({ label, name, placeholder, onInput }: InputTextFieldProps) => {
  return (
    <div className="mb-4">
      <label htmlFor={name} className="text-sm font-medium">
        {label}
      </label>
      <input
      type="text"
      id={name}
      name={name}
      onInput={onInput}
      className="w-full mt-2 px-3 py-2 bg-neutral-900 rounded-lg text-white text-sm outline-none"
      placeholder={placeholder}
      required
      />
    </div>
  )
}

export const InputTextareaField = ({ label, name, placeholder, rowCount } : InputTextareaFieldProps) => {
  return (
    <div className="mb-4">
      <label htmlFor={name} className="block text-sm font-medium">
        {label}
      </label>
      <textarea
        id={name}
        name={name}
        className="mt-2 w-full px-3 py-2 bg-neutral-900 text-white rounded-md text-sm outline-none"
        placeholder={placeholder}
        rows={rowCount}
        required
      />
    </div>
  )
} 

export const FormSubmitButton = ({ 
  action_state 
} : {
  action_state: {
    error: string
  }
}) => {
  return (
    <div className="flex flex-col justify-end">
      <p aria-live="polite" className={`p-1 px-2 text-sm rounded-md
        ${action_state?.error ? "font-semibold text-red-500" : "sr-only"}`}>
          {`Error: ${action_state?.error}`}
      </p>
      <button
        type="submit"
        className={`mt-2 mr-auto bg-blue-700 text-white px-4 py-2 rounded-lg`}
      >
        Submit
      </button>
    </div>
  )
}

