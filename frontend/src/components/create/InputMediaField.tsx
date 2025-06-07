import { useState } from "react";
import { validateFile } from "@/lib/utils";
import { DeleteIcon } from "../Icons";
import { InputMediaFieldProps } from "@/interface/create/InputMediaFieldProps";

const InputMediaField = ({
  name, label,
  accept, max_file_size,
  allowed_mime_types, state
} : InputMediaFieldProps) => {
  const [mediaFileSrc, setMediaFileSrc] = useState<string | null>(null);
  const [fileErrMsg, setFileErrMsg] = useState('');
  const [mediaFileType, setMediaFileType] = useState('');

  const onChangeImage = async(e : React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const targetFile = e.target.files?.[0];
    if (!targetFile) {
      return;
    }

    const isFileValid = await validateFile(targetFile, max_file_size, allowed_mime_types);
    if (!isFileValid.valid) {
      setMediaFileSrc('');
      setFileErrMsg(isFileValid.message);
      e.target.value = '';
      state.error = '';
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const imgData = reader.result as string;
      setMediaFileSrc(imgData);
      setMediaFileType(targetFile.type);
    }
    reader.readAsDataURL(targetFile);
    setFileErrMsg('');
    state.error = '';
  }

  const handleDeleteFile= () => {
    const fileInput = document.getElementById(name) as HTMLInputElement;
    if (fileInput) {
      fileInput.value = "";
      setMediaFileSrc(null);
    }
  }

  return (
    <div className="mb-4">
      <label 
        htmlFor={name}
        className="block text-sm font-medium mb-2"
      >
        {label}
      </label>
      <input
        id={name}
        name={name}
        type="file"
        accept={accept}
        className="w-full text-sm rounded-lg border border-neutral-800 file:mr-4 
          file:p-2 file:bg-neutral-800 file:text-sm file:font-semibold 
          file:text-neutral-200 file:border-0 file:hover:bg-neutral-700
          file:cursor-pointer"
        onChange={onChangeImage}
      />
      {fileErrMsg && (
        <p className="p-1 px-2 text-sm font-semibold text-red-500 rounded-md">
          {fileErrMsg}
        </p>
      )}
      {mediaFileSrc && (
        <div className="space-x-2 flex mt-2">
          <div className="border border-neutral-700">
            {mediaFileType?.startsWith("video") ? (
              <video 
                src={mediaFileSrc}
                controls
                className="w-full h-full object-cover"
              />
              ) : (
              <img
                src={mediaFileSrc}
                alt="Image"
                className="w-full h-full object-cover"
              />
            )} 
          </div>
          <button
            type="button"
            onClick={handleDeleteFile}
            className='mb-auto'
          >
            <DeleteIcon style={`hover:text-red-600`}/>
          </button>
        </div>
      )}
    </div>
  )
}

export default InputMediaField;
