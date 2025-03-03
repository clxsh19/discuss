// CommentsContext.tsx
import React, { createContext, useContext, useState, ReactNode } from "react";
import { CommentItemProp } from "@/interface/CommentProps";
import { fetchPostComments } from "@/lib/data_api";

interface CommentsContextProps {
  comments: CommentItemProp[],
  addComment: (newComment: CommentItemProp) => void,
  updateCommentState: (comment_id: number, newContent: string) => void,
  softDeleteComment: (comment_id: number) => void,
  sortComments: (post_id: number, newSort: 'new'| 'old' | 'top') => Promise<void>
}

interface CommentProviderProps {
  initialComments: CommentItemProp[],
  children: ReactNode
}

const CommentsContext = createContext<CommentsContextProps | undefined>(undefined);

export const CommentsProvider = ({ initialComments, children } : CommentProviderProps) => {
  const [comments, setComments] = useState<CommentItemProp[]>(initialComments);

  const sortComments = async(post_id: number, newSort: 'new'| 'old' | 'top') => {
    // const shalloCopy = comments.slice();client side sort maybe
    const newComments = await fetchPostComments(post_id, 0, newSort);
    console.log(newComments);
    setComments(newComments);
  }
  
  const addComment = (newComment: CommentItemProp) => {
    setComments((prevComments) => {
      return [newComment, ...prevComments]; 
    });
  };

  const updateCommentState = (comment_id: number, newContent: string) => {
    setComments((prevComments) => {
      const index = prevComments.findIndex((comment) => comment.comment_id === comment_id);
      if (index === -1) {
        return prevComments; // No changes if the comment isn't found
      }
      // Create a shallow copy of the array
      const updatedComments = [...prevComments];
      // Update the specific comment
      updatedComments[index] = { ...updatedComments[index], content: newContent };
      return updatedComments;
    });
  };

  const softDeleteComment = (comment_id: number) => {
    setComments((prevComments) => {
      const index = prevComments.findIndex((comment) => comment.comment_id === comment_id);
      if (index === -1) {
        return prevComments;
      }
      const updatedComments = [...prevComments];
      updatedComments[index] = { ...updatedComments[index], deleted: true };
      return updatedComments;
    });

  };
  
  return (
    <CommentsContext.Provider 
      value={{ 
        comments, 
        addComment, 
        updateCommentState, 
        softDeleteComment,
        sortComments
      }}
    >
      {children}
    </CommentsContext.Provider>
  );
};

export const useComments = () => {
  const context = useContext(CommentsContext);
  if (!context) {
    throw new Error("useComments must be used within a CommentsProvider");
  }
  return context;
};
