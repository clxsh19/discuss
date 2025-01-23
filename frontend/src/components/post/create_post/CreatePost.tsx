'use client'

import { useState, useEffect } from "react"
import PostForm from "./PostForm";
import { useAuth } from "@/components/context/AuthContext";
import { useRouter } from "next/navigation";

type PostType = 'TEXT' | 'MEDIA' | 'LINK';
interface CreatePostProps {
  sub_name?: string;
}

const CreatePost = ({ sub_name }: CreatePostProps) => {
  const [postType, setPostType] = useState<PostType>('TEXT');
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();

  const handleChange = (type : PostType) => {
    setPostType(type);
  } 
  
  useEffect(() => {
    if (loading) {
      return;
    }

    if (!isAuthenticated) {
      router.push('/login');
      return;
    }
  }, [loading, isAuthenticated]);
  
  if (!isAuthenticated || loading) {
    return <div></div>
  }

  return (
    <div className="max-w-2xl mx-auto text-white p-8 rounded-md shadow-sm">
      <h1 className="text-xl font-semibold mb-4">Create Post</h1>
      <div className="mb-4">
        <div className="flex space-x-4">
          <button className={`py-2 px-4 ${postType === 'TEXT' ? 'border-b-2 border-blue-500 font-medium' : 'text-gray-500'}`}
           onClick={() => handleChange('TEXT')}>
            Text
          </button>
          <button className={`py-2 px-4 ${postType === 'MEDIA' ? 'border-b-2 border-blue-500 font-medium' : 'text-gray-500'}`}
           onClick={() => handleChange('MEDIA')}>Media</button>
          <button className={`py-2 px-4 ${postType === 'LINK' ? 'border-b-2 border-blue-500 font-medium' : 'text-gray-500'}`}
           onClick={() => handleChange('LINK')}>Link</button>
        </div>
      </div>
        <PostForm sub_name={sub_name} postType={postType} />
    </div>
    
  )

}

export default CreatePost;
