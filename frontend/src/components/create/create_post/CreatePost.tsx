'use client'

import { useState, useEffect } from "react"
import PostForm from "./CreatePostForm";
import { useAuth } from "@/components/context/AuthContext";
import SwitchPostType from "./SwitchPostType";
import { useRouter, useSearchParams } from "next/navigation";
import { postType } from "@/interface/PostProps";


const CreatePost = () => {
  const [postType, setPostType] = useState<postType>('TEXT');
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const sub_name = searchParams.get("sub_name") || "";

  const handleChange = (type: postType) => {
    setPostType(type);
  } 
  
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/login');
    }
  }, [loading, isAuthenticated]);
  
  if (loading || !isAuthenticated) {
    // return <h1 className="text-white">loading</h1>
    return;
  }

  return (
    <div className="max-w-2xl mx-auto text-white p-8 rounded-md shadow-sm">
      <h1 className="text-xl font-semibold mb-4">Create Post</h1>
        <SwitchPostType
          postType={postType}
          handleChange={handleChange}
        />
        <PostForm subName={sub_name} postType={postType} />
    </div>
    
  )

}

export default CreatePost;
