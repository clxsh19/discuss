'use client'
 
import { useFormStatus } from 'react-dom'
import Button from '../ui/Button' 

const FormSubmitButton = () => {
  const { pending } = useFormStatus()
 
  return (
    <Button
      isLoading={pending}
      type="submit"
      label="Submit"
      style="mt-2 mr-auto bg-blue-700 text-white px-4 py-2 rounded-lg"
    />
  )
}

export default FormSubmitButton;
