'use client'

import { CommentsProvider } from "../context/CommentContext";
import CommentsView from "../comment/CommentsView";
import { CommentItemProp } from "@/interface/CommentProps";
import CommentOnPostForm from "./CommentOnPostForm";
import SortComments from "../comment/SortComments";

const CommentProviderContainer = ({ 
  initialComments, 
  post_id 
} : {
  initialComments: CommentItemProp[];
  post_id: number;
}) => {
  return (
    <CommentsProvider initialComments={initialComments}>
      <CommentOnPostForm post_id={post_id} />
      <SortComments post_id={post_id} />
      <CommentsView post_id={post_id} />
    </CommentsProvider>
  );
};

export default CommentProviderContainer;
