'use client'

import { useState } from 'react';
import { createComment } from '@/lib/create_api'; 

interface CommentBoxProp {
  post_id: number,
  parent_comment_id?: number,
} 

const CommentForm = ({ post_id, parent_comment_id }: CommentBoxProp) => {
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.currentTarget.value || '');
    console.log(parent_comment_id);
  };

  const handleSubmit = async () => {
    if (!comment.trim()) return;

    setLoading(true);

    try {
      console.log({ post_id, comment});
      await createComment({ post_id, parent_comment_id, comment});
      setComment('');
      setIsEditing(false);
    } catch (err) {
      console.error('Error submitting comment:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="comment-box w-full mt-4">
      {!isEditing ? (
        <button
          className="placeholder-button px-4 py-2 bg-gray-100 text-gray-500 rounded-md w-full text-left"
          onClick={() => setIsEditing(true)}
        >
          Add a comment
        </button>
      ) : (
        <div className="editor-container">
          <textarea
            value={comment}
            onChange={handleCommentChange} 
            className="editor w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={4}
            placeholder="What are your thoughts?"
          />
          <div className="actions mt-2 flex justify-end">
            <button
              className="cancel-btn px-4 py-2 mr-2 bg-gray-300 rounded"
              onClick={() => {
                setComment('');
                setIsEditing(false);
              }}
            >
              Cancel
            </button>
            <button
              className={`submit-btn px-4 py-2 bg-blue-500 text-white rounded ${loading ? 'cursor-wait' : ''}`}
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

export default CommentForm;

