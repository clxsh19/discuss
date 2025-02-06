import { useState } from 'react';
import { useFormState } from 'react-dom';
import { createPost } from '@/lib/create_api';
import { DeleteIcon } from '@/components/Icons';
import CommunitySearchBar from './CommunitySearchBar';
import { validateFile } from '@/lib/utils';


interface PostFormProps {
  post_type : 'TEXT' | 'MEDIA' | 'LINK',
  sub_name?: string,
}

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'video/mp4', 'video/mpeg'];

const PostForm = ({ post_type, sub_name }: PostFormProps) => {
  const intialState = {
    message: '',
    error: '',
  }

  const [fileSrc, setFileSrc] = useState<string | null>(null);
  const [fileType, setFileType] = useState<string | null>(null);
  const [fileErrMsg, setFileErrMsg] = useState('');
  const [state, formAction] = useFormState(createPost, intialState);

  const onChangeFile = async(e : React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const targetFile = e.target.files?.[0];
    if (!targetFile) {
      setFileErrMsg("Please select a file");
      return;
    }

    const isFileValid = await validateFile(targetFile, MAX_FILE_SIZE, ALLOWED_MIME_TYPES);
    if ( !isFileValid.valid ) {
      state.error = isFileValid.message;
      e.target.value = '';
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setFileSrc(reader.result as string);
      setFileType(targetFile.type);
    }
    reader.readAsDataURL(targetFile);
    setFileErrMsg('');
    state.error = '';
  }

  const handleDeleteFile = () => {
    const fileInput = document.getElementById("file") as HTMLInputElement;
    if (fileInput) fileInput.value = "";
    setFileSrc('');
  };

  return (
    <form action={formAction}>
      <div className="w-3/6 mb-4">
        <CommunitySearchBar sub_name={sub_name}/>
      </div>
      <div className="w-3/6 mb-4">
        <label htmlFor="title" className="block text-sm font-medium">
          Title
        </label>
        <input
          type="text"
          name="title"
          className="w-full mt-2 px-3 py-2 bg-neutral-900 rounded-lg text-white text-sm outline-none"
          placeholder="Enter the title..."
          required
        />
      </div>

      <input type="hidden" name="post_type" value={post_type} />
      <input type="hidden" name="sub_name" value={sub_name} />

      {post_type === 'TEXT' && (
        <div className="">
          <label htmlFor="text" className="block text-sm font-medium">
            Text
          </label>
          <textarea
            name="text"
            className="mt-2 w-full px-3 py-2 bg-neutral-900 text-white rounded-md text-sm outline-none"
            placeholder="Write your content..."
            rows={5}
            required
          />
        </div>
      )}

      { post_type === 'MEDIA' && (
        <div className="">
        <label 
          htmlFor="file"
          className="block text-sm font-medium mb-2">
            Upload
        </label>
        <input
          id="file"
          name="file"
          type="file"
          accept="image/*,video/*"
          onChange={onChangeFile}
          className="w-full text-sm rounded-lg border border-neutral-800 file:mr-4 
            file:p-2 file:bg-neutral-800 file:text-sm file:font-semibold 
            file:text-neutral-200 file:border-0 file:hover:bg-neutral-700
            file:cursor-pointer"
        />
        {(fileSrc) && (
          <div className="space-x-2 flex mt-2">
            <div className="border border-neutral-700">
              {fileType?.startsWith("video") ? (
                <video 
                  src={fileSrc}
                  controls
                  className="w-full h-full object-cover"
                />
                ) : (
                <img
                  src={fileSrc}
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
      )}

      {post_type === 'LINK' && (
        <div className="">
          <label htmlFor="link" className="block text-sm font-medium ">
            Link
          </label>
          <input
            type="url"
            name="link"
            className="mt-2 w-full px-3 py-3 bg-neutral-900 text-white rounded-md text-sm outline-none"
            placeholder="https://example.com"
            required
          />
        </div>
      )}

      <div className="flex flex-col justify-end">
        {(post_type === 'MEDIA' && fileErrMsg) && (
          <p aria-live="polite" className="p-1 px-2 text-sm font-semibold text-red-500 rounded-md">
            {`${fileErrMsg}`}
          </p>
        )}
        <p aria-live="polite" className={`p-1 px-2 text-sm rounded-md
          ${state?.error ? "font-semibold text-red-500" : "sr-only"}`}>
            {`Error: ${state?.error}`}
        </p>
        <button
          type="submit"
          className={`mt-2 mr-auto bg-blue-500 text-white px-4 py-2 rounded-lg`}
        >
          Post
        </button>
      </div>
    </form>
  )
}

export default PostForm;
