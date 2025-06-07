'use client'

import { useState } from 'react';
import { createComment } from '@/lib/create_api';
import { showErrorToast } from '../ui/Toasts';
import { useComments } from '../context/CommentContext';
import { useAuth } from '../context/AuthContext';
import Button from '../ui/Button';
import { CommentOnPostFormProps } from '@/interface/post/PostProps';

const CommentOnPostForm = ({ post_id }: CommentOnPostFormProps) => {
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
      showErrorToast('Login to comment!');
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
    } finally {
      setLoading(false);
    } 
  };

  return (
    <div className="mt-4 mb-4 font-mono overflow-hidden">
      {!isEditing ? (
        <Button 
          label="Add a comment..."
          isLoading={loading}
          style="w-full p-4 font-semibold text-sm text-left text-neutral-400 border border-neutral-800"
          onClick={() => setIsEditing(true)}
        />
      ) : (
        <>
          <textarea
            value={comment}
            onChange={handleCommentChange} 
            className="w-full py-3 px-3 bg-neutral-900 text-sm text-neutral-200 border border-neutral-800 outline-none"
            maxLength={15000}
            rows={5}
            placeholder="Type your comment..."
          />
          <div className="mt-2 flex justify-end space-x-4">
            <Button 
              label="Cancel"
              style="px-4 py-1 text-white rounded-md border border-neutral-800 hover:border-neutral-600"
              onClick={() => {
                setComment('');
                setIsEditing(false);
              }}
            />
            <Button 
              label="Comment"
              style="px-4 py-1 text-white rounded-md border border-neutral-800 hover:border-neutral-600"
              isLoading={loading}
              onClick={handleSubmit}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default CommentOnPostForm;

