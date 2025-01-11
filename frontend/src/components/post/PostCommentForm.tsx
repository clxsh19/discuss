'use client'

import { useState } from 'react';
import { createComment } from '@/lib/create_api';
import { showErrorToast } from '../ui/toasts';
import { useComments } from '../context/CommentContext';
import { useAuth } from '../context/AuthContext';

interface PostCommentProp {
  post_id: number,
} 

const PostCommentForm = ({ post_id }: PostCommentProp) => {
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
    <div className="w-11/12 h-1/5 mx-4 mb-4 lg:w-9/12 rounded-lg overflow-hidden">
      {!isEditing ? (
        <button
        className="placeholder-button p-4 bg-white text-gray-500 w-full text-left"
        onClick={() => setIsEditing(true)}
        disabled={loading}
      >
        Add a comment...
      </button>
      ) : (
        <div className="">
          <textarea
            value={comment}
            onChange={handleCommentChange} 
            className="w-full py-3 px-3 text-sm font-normal border border-gray-300 rounded-lg focus:ring-2"
            maxLength={15000}
            rows={5}
            placeholder="Type your comment..."
          />
          <div className="actions mt-2 flex justify-end">
            <button
              className="px-4 py-1 mr-4 border rounded-lg bg-white border-black"
              onClick={() => {
                setComment('');
                setIsEditing(false);
              }}
            >
              Cancel
            </button>
            <button
              className={`px-4 py-1 bg-black text-white  rounded-lg ${loading ? 'cursor-wait' : ''}`}
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

export default PostCommentForm;

