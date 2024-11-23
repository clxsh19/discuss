// CommentsContext.tsx
import React, { createContext, useContext, useState, ReactNode } from "react";
import { CommentItemProp } from "@/interface/CommentProp";

interface CommentsContextProps {
  comments: CommentItemProp[];
  addComment: (newComment: CommentItemProp) => void;
}

interface CommentProviderProps {
  initialComments: CommentItemProp[],
  children: ReactNode
}

const CommentsContext = createContext<CommentsContextProps | undefined>(undefined);

export const CommentsProvider = ({ initialComments, children } : CommentProviderProps) => {
  // intial comments fetched server side of map type
  // const [comments, setComments] = useState<Map<number, MapCommentProp>>(initialComments);
  const [comments, setComments] = useState<CommentItemProp[]>(initialComments);

  // const addComment = ( newComment: MapCommentProp) => {
  //   const parent_comment_id = newComment.parent_id;

  //   setComments((prevComments) => {
  //     // shallow copy of comments 
  //     const updatedComments = new Map(prevComments);
  //     if (parent_comment_id) { // if a child with parent id
  //       const parent = updatedComments.get(parent_comment_id);
  //       if (parent) {
  //         const updatedChildren = parent.children_id ? [...parent.children_id, newComment.comment_id] : [newComment.comment_id];
  //         updatedComments.set(parent_comment_id, { ...parent, children_id: updatedChildren });
  //       }
  //     } else { // no parent 
  //       updatedComments.set(newComment.comment_id, newComment);
  //     }
  //     updatedComments.set(newComment.comment_id, newComment);
  //     return updatedComments;
  //   });
  // };
  const addComment = (newComment: CommentItemProp) => {
    setComments((prevComments) => {
      return [newComment, ...prevComments]; 
    });
  };
  

  const updateComment = (comment_id: number, newContent: string) => {
  }

  return (
    <CommentsContext.Provider value={{ comments, addComment }}>
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
