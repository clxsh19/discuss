'use client'

import { useState } from 'react';
import { createComment } from '@/lib/create_api';

interface PostCommentProp {
  post_id: number,
} 

const PostCommentForm = ({ post_id }: PostCommentProp) => {
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.currentTarget.value || '');
  };

  const handleSubmit = async () => {
    if (!comment.trim()) return;

    setLoading(true);

    try {
      console.log({ post_id, comment});
      await createComment({ post_id, comment});
      setComment('');
      setIsEditing(false);
    } catch (err) {
      console.error('Error submitting comment:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-11/12 h-1/5 mx-4 lg:w-9/12 rounded-lg overflow-hidden">
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

