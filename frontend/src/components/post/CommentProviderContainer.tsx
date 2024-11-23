'use client'

import { CommentsProvider } from "../context/CommentContext";
import CommentsView from "../comment/CommentsView";
import { CommentItemProp } from "@/interface/CommentProp";
import PostCommentForm from "./PostCommentForm";

const CommentProviderContainer = ({ 
  initialComments, 
  post_id 
} : {
  initialComments: CommentItemProp[];
  post_id: number;
}) => {
  return (
    <CommentsProvider initialComments={initialComments}>
      <PostCommentForm post_id={post_id} />
      <CommentsView post_id={post_id} />
    </CommentsProvider>
  );
};

export default CommentProviderContainer;