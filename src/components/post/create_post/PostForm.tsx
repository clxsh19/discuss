

import React, { useState } from 'react';

interface PostFormProps {
  postType : string,
  sub_name: string,
}

const PostForm = ({ postType, sub_name }: PostFormProps) => {
  const [imgSrc, setImgSrc] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null)

  const submitPost = async(e : React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', e.currentTarget.postTitle.value);
    formData.append('sub_name', sub_name);

    if (postType == 'TEXT') {
      formData.append('text', e.currentTarget.postText.value);
    } else if (postType == 'MEDIA') {
      if (!file || file === null) { // make sure file not null
        console.log('file state empty');  
        return;
      }
      formData.append('file', file);// same name as multer.single(name)
    } else if (postType == 'LINK') {
      const encodedLink = encodeURIComponent(e.currentTarget.postLink.value);
      formData.append('link', e.currentTarget.postLink.value);
    };

    try {
      formData.forEach((value, key) => {
          console.log(key, value, typeof(value));
      });
      const res = await fetch(`http://localhost:5000/api/post/create?type=${postType}`, {
        method: 'POST',
        body: formData,
        // body: JSON.stringify(rawData),
        credentials: 'include',
      });
      const res_code = await res.json();
      console.log(res_code);
    } catch (error) {
      console.error('failed to create post');
      throw new Error('failed to create post');
    }
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
        <div className="mb-4">
          <label htmlFor="postTitle" className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            id="postTitle"
            name="title"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Title"
            required
          />
          <span className="text-xs text-gray-500 float-right">0/300</span>
        </div>

        {postType === 'TEXT' && (
          <div className="mb-4">
            <label htmlFor="postText" className="block text-sm font-medium text-gray-700">
              Text
            </label>
            <textarea
              id="postText"
              name="text"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Write your post..."
              rows={4}
            />
          </div>
        )}

        {postType === 'MEDIA' && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Upload</label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-md">
              <div className="space-y-1 text-center">
                {imgSrc ? (
                  <img
                    src={imgSrc}
                    alt="Image Preview"
                    className="mx-auto h-48 w-48 object-contain"
                  />
                ) : (
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    stroke="currentColor"
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
                <div className="flex text-sm text-gray-600">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                  >
                    <span>Drag and Drop images or videos or</span>
                    <input
                      id="file-upload"
                      name="file-upload"
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
            <label htmlFor="postLink" className="block text-sm font-medium text-gray-700">
              Link
            </label>
            <input
              type="url"
              id="postLink"
              name="link"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="https://example.com"
            />
          </div>
        )}

        <div className="flex justify-end space-x-3">
          <button
            type="button"
            className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300"
          >
            Save draft
          </button>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Post
          </button>
        </div>
      </form>
  )
}

export default PostForm;