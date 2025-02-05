import { useState } from 'react';
import { useFormState } from 'react-dom'
import { DeleteIcon } from '@/components/Icons';
import { createCommunity } from '@/lib/create_api';
import { validateFile } from '@/lib/utils';

const intialState = {
  error: '',
  message: '', 
}

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

const CreateSubForm = () => {
  const [bannerImgSrc, setBannerImgSrc] = useState<string | null>(null);
  const [logoImgSrc, setLogoImgSrc] = useState<string | null>(null);
  const [fileErr, setFileErr] = useState({
    bannerErrorMsg: '',
    logoErrorMsg: ''
  });
  
  const [state, formAction] = useFormState(createCommunity, intialState)
  
  const onChangeImage = async(e : React.ChangeEvent<HTMLInputElement>, isBanner: boolean) => {
    e.preventDefault();
    const targetFile = e.target.files?.[0];
    if (!targetFile) {
      return;
    }

    const isFileValid = await validateFile(targetFile, MAX_FILE_SIZE, ALLOWED_MIME_TYPES);
    if ( !isFileValid.valid ) {
      if (isBanner) {
        setFileErr({ logoErrorMsg: '', bannerErrorMsg: isFileValid.message });
        setBannerImgSrc('');
      } else {
        setFileErr({ bannerErrorMsg: '', logoErrorMsg: isFileValid.message });
        setLogoImgSrc('');
      }
      e.target.value = '';
      state.error = '';
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const imgData = reader.result as string;
      isBanner ? setBannerImgSrc(imgData) : setLogoImgSrc(imgData);
    }
    reader.readAsDataURL(targetFile);
    setFileErr({ logoErrorMsg: '', bannerErrorMsg: '' });
    state.error = '';
  }

  const handleDeleteImage = (isBanner: boolean) => {
    const fileInput = document.getElementById(isBanner ? "banner" : "logo") as HTMLInputElement;
    if (fileInput) fileInput.value = "";
    
    isBanner ? setBannerImgSrc(null) : setLogoImgSrc(null);
  };

  return (
    <form action={formAction}>
      <div className="mb-4">
        <label htmlFor="name" className="text-sm font-medium">
          Name
        </label>
        <input
          type="text" 
          id="name"
          name="name"
          onInput={(e) => {
            const input = e.target as HTMLInputElement;
            input.value = input.value.replace(/\s/g, '');
          }}
          className="w-full mt-2 px-3 py-2 bg-neutral-900 rounded-lg text-white text-sm outline-none"
          placeholder="Enter the community name..."
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="displayName" className="text-sm font-medium">
          Display Name
        </label>
        <input
          type="text" 
          id="displayName"
          name="displayName"
          onInput={(e) => {
            const input = e.target as HTMLInputElement;
            input.value = input.value.trimStart();
          }}
          className="w-full mt-2 px-3 py-2 bg-neutral-900 rounded-lg text-white text-sm outline-none"
          placeholder="Display name shown as community title... "
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="description" className="block text-sm font-medium">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          className="mt-2 w-full px-3 py-2 bg-neutral-900 text-white rounded-md text-sm outline-none"
          placeholder="Write your community description, rules etc..."
          rows={5}
        />
      </div>
      <div className="mb-4">
        <label 
          htmlFor="banner"
          className="block text-sm font-medium mb-2">
            Banner
        </label>
        <input
          id="banner"
          name="banner"
          type="file"
          accept="image/*"
          className="w-full text-sm rounded-lg border border-neutral-800 file:mr-4 
            file:p-2 file:bg-neutral-800 file:text-sm file:font-semibold 
            file:text-neutral-200 file:border-0 file:hover:bg-neutral-700
            file:cursor-pointer"
          onChange={(e) => onChangeImage(e, true)}
        />
        {fileErr.bannerErrorMsg && (
          <p aria-live="polite" className="p-1 px-2 text-sm font-semibold text-red-500 rounded-md">
            {`${fileErr.bannerErrorMsg}`}
          </p>
        )}
        {bannerImgSrc && (
          <div className="space-x-2 flex mt-2">
            <div className="border border-neutral-700">
              <img
                src={bannerImgSrc}
                alt="Banner Preview"
                className="w-full h-full object-cover"
              />
            </div>
            <button
              type="button"
              onClick={() => handleDeleteImage(true)}
              className='mb-auto'
            >
              <DeleteIcon style={`hover:text-red-600`}/>
            </button>
        </div>
        )}
      </div>

      <div className="mb-4">
        <label 
          htmlFor="logo"
          className="block text-sm font-medium mb-2">
          Logo
        </label>
        <input
          id="logo"
          name="logo"
          type="file"
          accept="image/*"
          className="w-full text-sm rounded-lg border border-neutral-800 file:mr-4 
            file:p-2 file:bg-neutral-800 file:text-sm file:font-semibold 
            file:text-neutral-200 file:border-0 file:hover:bg-neutral-700
            file:cursor-pointer"
          onChange={(e) => onChangeImage(e, false)}
        />
        {fileErr.logoErrorMsg && (
          <p aria-live="polite" className="p-1 px-2 text-sm font-semibold text-red-500 rounded-md">
            {`${fileErr.logoErrorMsg}`}
          </p>
        )}
        {logoImgSrc && (
          <div className="flex mt-2">
            <div className="w-24 h-24 rounded-full overflow-hidden border border-neutral-700">
              <img
                src={logoImgSrc}
                alt="Logo Preview"
                className="w-full h-full object-cover"
              />
            </div>
            <button
              type="button"
              onClick={() => handleDeleteImage(false)}
              className='mb-auto'
            >
              <DeleteIcon style={`hover:text-red-600`}/>
            </button>
          </div>
        )}
      </div>
      <div className="flex flex-col justify-end">
        <p aria-live="polite" className={`p-1 px-2 text-sm rounded-md
        ${state?.error ? "font-semibold text-red-500" : "sr-only"}`}>
          {`Error: ${state?.error}`}
        </p>
        <button
          type="submit"
          disabled={fileErr.bannerErrorMsg !== '' || fileErr.logoErrorMsg !== '' }
          className={`mt-2 mr-auto text-white px-4 py-2 rounded-lg 
            ${(fileErr.bannerErrorMsg !== '' || fileErr.logoErrorMsg !== '' ) 
              ? "bg-slate-900" : "bg-blue-600 hover:bg-blue-500 " 
            }`
          }
        >
          Submit
        </button>
      </div>
    </form>
  )
}

export default CreateSubForm;