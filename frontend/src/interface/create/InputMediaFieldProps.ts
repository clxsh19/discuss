export interface InputMediaFieldProps {
  label: string;
  name: string;
  placeholder?: string;
  accept: string;
  max_file_size: number;
  allowed_mime_types: string[];
  state: {
    error: string
  };
}

