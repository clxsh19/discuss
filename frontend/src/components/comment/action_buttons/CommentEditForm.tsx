'use client'

import { useState } from 'react';
import { updateComment } from '@/lib/create_api';
import { useComments } from '../../context/CommentContext';
import { showErrorToast } from '../../ui/toasts';

interface CommentEditProp {
  user: {
    id: number,
    username: string   
  } | null,
  isAuthenticated: boolean,
  comment_id: number,
  initialComment: string,
  setShowEditForm: React.Dispatch<React.SetStateAction<boolean>>
} 

const CommentEditForm = ({ user, isAuthenticated, comment_id, initialComment, setShowEditForm }: CommentEditProp) => {
  const [comment, setComment] = useState(initialComment);
  const [loading, setLoading] = useState(false);
  const { updateCommentState } = useComments();


  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.currentTarget.value || '');
  };

  const handleSubmit = async () => {
    if (!comment.trim()) return;
    setLoading(true);

    try {
      if (!comment.trim()) {
        showErrorToast('Empty comment!');
        return;
      }  
      if (!isAuthenticated || !user) {
        showErrorToast('You must be logged in to comment!');
        return;
      }
      
      await updateComment(comment_id, comment);
      updateCommentState(comment_id, comment);
      setComment('');
      setShowEditForm(false);
    } catch (err) {
      showErrorToast('Failed to update comment.')
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
        placeholder="Edit your comment..."
      />
      <div className="flex bg-neutral-800 font-bold text-xs -mt-2 px-2 py-1 justify-end">
        <button
          className="px-2 py-1 mr-4 text-white rounded-sm border border-neutral-700 hover:border-neutral-600"
          onClick={() => {
            setComment('');
            setShowEditForm(false)
          }}
        >
          Cancel
        </button>
        <button
          className={`px-2 py-1 text-white rounded-sm border border-neutral-700 hover:border-neutral-600 ${loading ? 'cursor-wait' : ''}`}
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

