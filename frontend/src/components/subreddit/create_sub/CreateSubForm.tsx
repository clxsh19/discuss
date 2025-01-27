import { useState } from 'react';
import { DeleteIcon } from '@/components/Icons';

const CreateSubForm = () => {
  const [bannerImgSrc, setBannerImgSrc] = useState<string | null>(null);
  const [bannerFile, setBannerFile] = useState<File | null>(null);
  const [logoImgSrc, setLogoImgSrc] = useState<string | null>(null);
  const [logoFile, setLogoFile] = useState<File | null>(null);

  const onChangeImage = (e : React.ChangeEvent<HTMLInputElement>, isBanner: boolean) => {
    e.preventDefault();
    const targetFile = e.target.files?.[0];
    if (targetFile) {
      isBanner ? setBannerFile(targetFile) : setLogoFile(targetFile);

      const reader = new FileReader();
      reader.onloadend = () => {
        const imgData = reader.result as string;
        isBanner ? setBannerImgSrc(imgData) : setLogoImgSrc(imgData);
      }
      reader.readAsDataURL(targetFile);
    }
  }

  return (
    <form action="" encType="multipart/form-data">
      <div className="mb-4">
        <label htmlFor="name">
          Name
        </label>
        <input
          type="text" 
          id="name"
          name="name"
          className="w-full mt-2 px-3 py-2 bg-neutral-900 rounded-lg text-white text-sm outline-none"
          placeholder="Enter the community name..."
          required/>
      </div>
      <div className="mb-4">
        <label htmlFor="displayName">
          Display Name
        </label>
        <input
          type="text" 
          id="displayName"
          name="displayName"
          className="w-full mt-2 px-3 py-2 bg-neutral-900 rounded-lg text-white text-sm outline-none"
          placeholder="Display name shown as community title... "
          required/>
      </div>
      <div className="mb-4">
        <label htmlFor="description" className="block text-sm font-medium">
          Text
        </label>
        <textarea
          id="description"
          name="text"
          className="mt-2 w-full px-3 py-2 bg-neutral-900 text-white rounded-md text-sm outline-none"
          placeholder="Write your community description, rules etc..."
          rows={5}
        />
      </div>
      <div className="mb-4">
        <label 
          htmlFor="banner"
          className="block text-sm font-medium mb-2">Banner</label>
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
        {bannerImgSrc && (
          <div className="w-full mt-2 relative group">
            <img
              src={bannerImgSrc}
              alt="Banner Preview"
              className="w-2/3 mr-auto object-contain"
            />
            <button
              type="button"
              // onClick={() => handleDeleteImage(true)}
              className="absolute top-2 right-[calc(33%+8px)]"
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
        {logoImgSrc && (
          <div className="flex mt-2">
            <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-gray-200">
              <img
                src={logoImgSrc}
                alt="Logo Preview"
                className="w-full h-full object-cover"
              />
            </div>
            <button
              type="button"
              // onClick={() => handleDeleteImage(true)}
              className='mb-auto'
            >
              <DeleteIcon style={`hover:text-red-600`}/>
            </button>
          </div>
        )}
      </div>
      <div className="flex justify-end">
        <button
          type="submit"
          className="mt-2 mr-auto bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          Submit
        </button>
      </div>
    </form>
  )
}

export default CreateSubForm;