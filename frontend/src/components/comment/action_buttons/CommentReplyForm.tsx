'use client'

import { useState } from 'react';
import { useComments } from '../../context/CommentContext';
import { showErrorToast } from '../../ui/Toasts';
import { createComment } from '@/lib/create_api';
import { CommentReplyProps } from '@/interface/comment/ActionButtonProps';

const CommentReplyForm = ({
  user, isAuthenticated,
  post_id, parent_comment_id,
  setShowReplyForm 
} : CommentReplyProps) => {
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);
  const { addComment } = useComments();

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.currentTarget.value || '');
  };

  const handleSubmit = async () => {
    if (!comment.trim()) {
      showErrorToast('Empty comment.');
      return;
    }
  
    if (!isAuthenticated || !user) {
      showErrorToast('You must be logged in to comment.');
      return;
    }

    setLoading(true);
    
    try {
      const comment_id = await createComment({ post_id, parent_comment_id, comment});
      addComment({
        user_id: user.id,
        comment_id,
        parent_id: parent_comment_id,
        username: user.username,
        created_at: '',
        total_votes: 0,
        vote_type: null,
        content: comment,
        deleted: false
      })
      setComment('');
      setShowReplyForm(false);
    } catch (err) {
      showErrorToast('Failed to create comment.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-4/6 mx-4 my-2">
      <textarea
        value={comment}
        onChange={handleCommentChange} 
        className="w-full py-3 px-3 bg-neutral-900 text-sm text-neutral-100 border border-neutral-800 outline-none"
        maxLength={15000}
        rows={5}
        placeholder="Type your comment..."
      />
      <div className="flex bg-neutral-800 font-bold text-xs -mt-2 px-2 py-1 justify-end">
        <button
          className="px-2 py-1 mr-4 text-white rounded-sm border border-neutral-700 hover:border-neutral-600"
          onClick={() => {
            setComment('');
            setShowReplyForm(false)
          }}
        >
          Cancel
        </button>
        <button
          className={`px-2 py-1 text-white rounded-sm border border-neutral-700 hover:border-neutral-600 ${loading ? 'cursor-wait' : ''}`}
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? 'Submitting...' : 'Comment'}
        </button>
      </div>
    </div>
  );
};

export default CommentReplyForm;

