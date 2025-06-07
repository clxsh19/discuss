import { CommentItemProp } from "../CommentProps";
import { ReactNode } from "react";

type CommentSortType = 'new'| 'old' | 'top';

export interface CommentsContextProps {
  comments: CommentItemProp[],
  addComment: (newComment: CommentItemProp) => void,
  updateCommentState: (comment_id: number, newContent: string) => void,
  softDeleteComment: (comment_id: number) => void,
  sortComments: (post_id: number, newSort: CommentSortType) => Promise<void>
}

export interface CommentProviderProps {
  initialComments: CommentItemProp[],
  children: ReactNode
}
