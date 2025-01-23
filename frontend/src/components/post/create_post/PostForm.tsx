import { useState } from 'react';
import { createPost } from '@/lib/create_api';
import CommunitySearchBar from './CommunitySearchBar';

interface PostFormProps {
  postType : 'TEXT' | 'MEDIA' | 'LINK',
  sub_name?: string,
}

const PostForm = ({ postType, sub_name }: PostFormProps) => {
  const [imgSrc, setImgSrc] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null)

  const submitPost = async(e : React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', e.currentTarget.postTitle.value);
    formData.append('sub_name', e.currentTarget.communityName.value);

    switch (postType) {
      case 'TEXT':
        formData.append('text', e.currentTarget.postText.value);
        break;
    
      case 'MEDIA':
        if (!file || file === null) { // Ensure file is not null
          console.log('file state empty');
          return;
        }
        formData.append('file', file); // Same name as multer.single(name)
        break;
    
      case 'LINK':
        formData.append('link', e.currentTarget.postLink.value);
        break;
    
      default:
        console.log('Invalid post type');
        return;
    }
    
    const res = await createPost(formData, postType);
    console.log(res);
  };

  const onChangeImage = (e : React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const file = e.target.files?.[0];
    if (file) {
      setFile(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setImgSrc(reader.result as string);
      }
      reader.readAsDataURL(file);
    }
  }
  return (
    <form onSubmit={submitPost} encType="multipart/form-data">
      <div className="w-3/6 mb-4">
        <CommunitySearchBar sub_name={sub_name}/>
      </div>
      <div className="w-3/6 mb-4">
        <label htmlFor="postTitle" className="block text-sm font-medium">
          Title
        </label>
        <input
          type="text" 
          id="postTitle"
          name="title"
          className="w-full mt-2 px-3 py-2 bg-neutral-900 rounded-lg text-white text-sm outline-none"
          placeholder="Enter the title..."
          required
        />
      </div>

      {postType === 'TEXT' && (
        <div className="mb-4">
          <label htmlFor="postText" className="block text-sm font-medium">
            Text
          </label>
          <textarea
            id="postText"
            name="text"
            className="mt-2 w-full px-3 py-2 bg-neutral-900 text-white rounded-md text-sm outline-none"
            placeholder="Write your post..."
            rows={5}
          />
        </div>
      )}

      {postType === 'MEDIA' && (
        <div className="mb-4">
          <label className="block text-sm font-medium ">Upload</label>
          <div className="mt-2 flex justify-center px-6 pt-5 pb-6 bg-neutral-900 border-2 border-gray-600 border-dashed rounded-md">
            <div className="space-y-1 text-center">
              {imgSrc ? (
                <img
                  src={imgSrc}
                  alt="Image Preview"
                  className="mx-auto h-48 w-48 object-contain"
                />
              ) : (
                <svg
                  className="mx-auto h-12 w-12 "
                  stroke="white"
                  fill="none"
                  viewBox="0 0 48 48"
                  aria-hidden="true"
                >
                  <path
                    d="M28 8h4a2 2 0 012 2v12m-4 4h4m-10 0h4m-10 0h4m-10 0h4M8 22h4"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
              <div className="flex text-sm ">
                <label
                  htmlFor="file-upload"
                  className="cursor-pointer rounded-md font-medium text-blue-300 hover:text-blue-500"
                >
                  <span>Drag or Drop Media</span>
                  <input
                    id="file-upload"
                    name="image"
                    type="file"
                    className="sr-only"
                    accept="image/*,video/*"
                    onChange={onChangeImage}
                  />
                </label>
              </div>
            </div>
          </div>
        </div>
      )}

      {postType === 'LINK' && (
        <div className="mb-4">
          <label htmlFor="postLink" className="block text-sm font-medium ">
            Link
          </label>
          <input
            type="url"
            id="postLink"
            name="link"
            className="mt-2 w-full px-3 py-3 bg-neutral-900 text-white rounded-md text-sm outline-none"
            placeholder="https://example.com"
          />
        </div>
      )}

      <div className="flex justify-end">
        <button
          type="submit"
          className="mt-2 mr-auto bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          Post
        </button>
      </div>
    </form>
  )
}

export default PostForm;