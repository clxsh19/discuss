'use client'

import { useState } from 'react';
import { createComment } from '@/lib/create_api';
import { showErrorToast } from '../ui/toasts';
import { useComments } from '../context/CommentContext';
import { useAuth } from '../context/AuthContext';

interface CommentOnPostFormProp {
  post_id: number,
} 

const CommentOnPostForm = ({ post_id }: CommentOnPostFormProp) => {
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const { addComment } = useComments();
  const { isAuthenticated, user } = useAuth();

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.currentTarget.value || '');
  };

  const handleSubmit = async () => {
    if (!comment.trim()) {
      showErrorToast('Empty comment!');
      return;
    }
  
    if (!isAuthenticated || !user) {
      showErrorToast('You must be logged in to comment!');
      return;
    }

    setLoading(true);

    try {
      setIsEditing(false);
      const comment_id = await createComment({ post_id, comment});

      addComment({
        user_id: user.id,
        comment_id,
        username: user.username,
        created_at: '',
        total_votes: 0,
        vote_type: null,
        content: comment,
        deleted: false
      });
      setComment('');
    } catch (err) {
      showErrorToast('Failed to submit the comment.');
      console.error('Error submitting comment:', err);

    } finally {
      setLoading(false);
    } 
  };

  return (
    <div className="mt-4 mb-4 font-mono overflow-hidden">
      {!isEditing ? (
        <button
        className="w-full p-4 font-semibold text-sm text-left text-neutral-400 border border-neutral-800"
        onClick={() => setIsEditing(true)}
        disabled={loading}
      >
        Add a comment...
      </button>
      ) : (
        <div>
          <textarea
            value={comment}
            onChange={handleCommentChange} 
            className="w-full py-3 px-3 bg-neutral-900 text-sm text-neutral-200 border border-neutral-800 outline-none"
            maxLength={15000}
            rows={5}
            placeholder="Type your comment..."
          />
          <div className="mt-2 flex justify-end space-x-4">
            <button
              className="px-4 py-1 text-white rounded-md border border-neutral-800 hover:border-neutral-600"
              onClick={() => {
                setComment('');
                setIsEditing(false);
              }}
            >
              Cancel
            </button>
            <button
              className={`px-4 py-1 text-white rounded-md border border-neutral-800 hover:border-neutral-600 ${loading ? 'cursor-wait' : ''}`}
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? 'Submitting...' : 'Comment'}
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

export default CommentOnPostForm;

