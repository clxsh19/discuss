'use client'

import { useState } from 'react';
import { updateComment } from '@/lib/create_api';

interface CommentEditProp {
  comment_id: number,
  initialComment: string,
  setShowEditForm: React.Dispatch<React.SetStateAction<boolean>>
} 

const CommentEditForm = ({ comment_id, initialComment, setShowEditForm}: CommentEditProp) => {
  const [comment, setComment] = useState(initialComment);
  const [loading, setLoading] = useState(false);

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.currentTarget.value || '');
  };

  const handleSubmit = async () => {
    if (!comment.trim()) return;

    setLoading(true);

    try {
      // console.log({ post_id, comment});
      await updateComment(comment_id, comment);
      setComment('');
      setShowEditForm(false);
    } catch (err) {
      console.error('Error updating comment:', err);
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
        placeholder="Edit your comment..."
      />
      <div className="flex bg-slate-200 font-bold text-xs -mt-2 px-2 py-1 justify-end">
        <button
          className="px-2 py-1 mr-4"
          onClick={() => {
            setComment('');
            setShowEditForm(false)
          }}
        >
          Cancel
        </button>
        <button
          className={`px-2 py-1 bg-slate-400 text-white rounded-lg ${loading ? 'cursor-wait' : ''}`}
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? 'Submitting...' : 'Edit'}
        </button>
      </div>
    </div>
  );
};

export default CommentEditForm;

