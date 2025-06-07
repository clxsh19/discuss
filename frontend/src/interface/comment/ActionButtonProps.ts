type UserType = {
  id: number;
  username: string;
}

export interface CommentActionButtonsProps {
  comment_id: number,
  user_id: number,
  post_id: number,
  comment: string,
  votes_count: number,
  vote_type: 1|-1|null,
  submitVote: (id: number, vote_type: 1 | -1) => Promise<void>,
  parent_comment_id : number,
}

export interface CommentDeleteConfirmProps {
  comment_id: number,
  setShowDeleteConfirm: React.Dispatch<React.SetStateAction<boolean>>
}

export interface CommentEditProps {
  user: UserType | null,
  isAuthenticated: boolean,
  comment_id: number,
  initialComment: string,
  setShowEditForm: React.Dispatch<React.SetStateAction<boolean>>
} 

export interface CommentReplyProps {
  user: UserType | null,
  isAuthenticated: boolean,
  post_id: number,
  parent_comment_id?: number,
  setShowReplyForm: React.Dispatch<React.SetStateAction<boolean>>,
}
