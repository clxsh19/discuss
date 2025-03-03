interface AuthFormProps {
  linkText: string;
  linkLabel: string;
  submitText: string;
  authSubmit: (formData: FormData) => Promise<{
    error: string;
    message: string;
  }>;
}

export default AuthFormProps;
