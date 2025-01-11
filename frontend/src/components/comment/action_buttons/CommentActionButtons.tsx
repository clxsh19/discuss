import { useState} from "react";
import { useAuth } from "../../context/AuthContext";
import CommentReplyForm from "./CommentReplyForm";
import CommentEditForm from "./CommentEditForm";
import VoteButton from "../../ui/VoteButton";
import CommentDeleteConfirm from "./CommentDeleteConfirm";

interface CommentActionButtonsProps {
  comment_id: number,
  username: string,
  user_id: number,
  post_id: number,
  comment: string,
  votes_count: number,
  vote_type: 1|-1|null,
  submitVote: (id: number, vote_type: 1 | -1) => Promise<void>,
  parent_comment_id : number,
}
// remove parent comment id as comment id same
const CommentActionButtons = (
  { username, comment_id, user_id, post_id, votes_count, 
    vote_type, submitVote, parent_comment_id, comment
  } : CommentActionButtonsProps) => {
  const { isAuthenticated, user } = useAuth();  
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const isAuthor = user_id === user?.id;
  
  return (
    <div id={`comment-buttons-${comment_id}`} className="flex flex-col action-buttons">
      <div className="flex items-center  text-xs mt-1">

        {/* Vote Button */}
        <VoteButton 
          id={comment_id}
          votes_count={votes_count}
          vote_type={vote_type}
          submitVote={submitVote}
          className="ml-2 py-2 bg-white"
        />

        {/* Reply Button */}
        <button onClick={() => setShowReplyForm((prev) => !prev)} className="ml-3">
          <span className="text-xs font-semibold text-neutral-600">Reply</span>
        </button>

        {/* Edit Button */}
        {isAuthor && (
          <button onClick={() => setShowEditForm((prev) => !prev)} className="ml-3">
            <span className="text-xs font-semibold text-neutral-600">Edit</span>
          </button>
        )}

        {/* Share Button */}
        <button className="ml-3">
          <span className="text-xs font-semibold text-neutral-600">Share</span>
        </button>

        {/* Delete Button */}
        {isAuthor && (
          <button onClick={() => setShowDeleteConfirm((prev) => !prev)} className="ml-3">
            <span className="text-xs font-semibold text-neutral-600">Delete</span>
          </button>
        )}
        
        { (isAuthenticated && showDeleteConfirm)  && (
        <CommentDeleteConfirm 
          comment_id={comment_id}
          setShowDeleteConfirm={setShowDeleteConfirm}
        />
      )}
      </div>

      { showReplyForm && (
        <CommentReplyForm 
          user={user}
          isAuthenticated={isAuthenticated}
          post_id={post_id} 
          parent_comment_id={parent_comment_id}
          setShowReplyForm={setShowReplyForm}
        />
      )}

      { (isAuthenticated && showEditForm) && (
        <CommentEditForm 
          user={user}
          isAuthenticated={isAuthenticated}
          comment_id={comment_id}
          initialComment={comment}
          setShowEditForm={setShowEditForm}
        />
      )}

      


    </div>
  )
}

export default CommentActionButtons;


  
