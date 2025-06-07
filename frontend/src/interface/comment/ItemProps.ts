export interface DeletedCommentItemProps {
  comment_id: number;
  created_at: string;
  total_votes: number;
}

export interface CommentItemProps extends DeletedCommentItemProps {
  username: string;
}
