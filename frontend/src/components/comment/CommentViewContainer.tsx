'use client'

import { CommentsProvider } from "../context/CommentContext";
import CommentsView from "./CommentsView";
import { MapCommentProp } from "@/interface/CommentProp";

interface CommentViewContainerProps {
  initialComments: Map<number, MapCommentProp>;
  post_id: number;
}

const CommentViewContainer = ({ initialComments, post_id } : CommentViewContainerProps) => {
  return (
    <CommentsProvider initialComments={initialComments}>
      <CommentsView post_id={post_id} />
    </CommentsProvider>
  );
};

export default CommentViewContainer;
