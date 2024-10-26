'use client'

import { useState, useEffect } from "react"
import PostForm from "./PostForm";
import { useAuth } from "@/components/context/AuthContext";
import { redirect } from "next/navigation";

type PostType = 'TEXT' | 'MEDIA' | 'LINK';
interface CreatePostProps {
  sub_name: string;
}

const CreatePost = ({ sub_name }: CreatePostProps) => {
  const [postType, SetPostType] = useState<PostType>('TEXT');
  const { isAuthenticated } = useAuth();

  const handleChange = (type : PostType) => {
    SetPostType(type);
  }

  useEffect(() => {
    if (!isAuthenticated) {
      return redirect("/login");
    }
  }, []);

  if (!isAuthenticated) {
    return null;
  };
  

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-md shadow-sm">
      <h1 className="text-xl font-semibold mb-4">Create Post</h1>
      <div className="border-b border-gray-200 mb-4">
        <div className="flex space-x-4">
          <button className={`py-2 px-4 ${postType === 'TEXT' ? 'border-b-2 border-blue-500 font-medium' : 'TEXT-gray-600'}`}
           onClick={() => handleChange('TEXT')}>
            TEXT
          </button>
          <button className={`py-2 px-4 ${postType === 'MEDIA' ? 'border-b-2 border-blue-500 font-medium' : 'TEXT-gray-600'}`}
           onClick={() => handleChange('MEDIA')}>Images & Videos</button>
          <button className={`py-2 px-4 ${postType === 'LINK' ? 'border-b-2 border-blue-500 font-medium' : 'TEXT-gray-600'}`}
           onClick={() => handleChange('LINK')}>Link</button>
        </div>
      </div>
        <PostForm sub_name={sub_name} postType={postType} />
    </div>
    
  )

}

export default CreatePost;