'use client'

import { useState } from 'react';
import { createComment } from '@/lib/create_api';

interface CommentReplyProp {
  post_id: number,
  parent_comment_id?: number,
  setShowReplyForm: React.Dispatch<React.SetStateAction<boolean>>
} 

const CommentReplyForm = ({ post_id, parent_comment_id , setShowReplyForm}: CommentReplyProp) => {
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);

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
      setShowReplyForm(false);
    } catch (err) {
      console.error('Error submitting comment:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-4/6 border rounded-b-lg border-gray-300 mx-4 my-2 focus:ring-2">
      <textarea
        value={comment}
        onChange={handleCommentChange} 
        className="w-full py-3 px-3 text-sm font-normal border border-gray-300 "
        maxLength={15000}
        rows={5}
        placeholder="Type your comment..."
      />
      <div className="flex bg-slate-200 font-bold text-xs -mt-2 px-2 py-1 justify-end">
        <button
          className="px-2 py-1 mr-4"
          onClick={() => {
            setComment('');
            setShowReplyForm(false)
          }}
        >
          Cancel
        </button>
        <button
          className={`px-2 py-1 bg-slate-400 text-white rounded-lg ${loading ? 'cursor-wait' : ''}`}
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

