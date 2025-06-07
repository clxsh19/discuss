'use client'

import { CommentsProvider } from "../context/CommentContext";
import CommentsContainer from "../comment/CommentsContainer";
import CommentOnPostForm from "./CommentOnPostForm";
import SortComments from "../comment/SortComments";
import { CommentProviderContainerProps } from "@/interface/post/PostProps";

const CommentProviderContainer = ({ 
  initialComments, 
  post_id 
} : CommentProviderContainerProps ) => {
  return (
    <CommentsProvider initialComments={initialComments}>
      <CommentOnPostForm post_id={post_id} />
      <SortComments post_id={post_id} />
      <CommentsContainer post_id={post_id} />
    </CommentsProvider>
  );
};

export default CommentProviderContainer;
