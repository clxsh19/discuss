'use client';

import { useState, useEffect } from "react";
import { DownvoteIcon, UpvoteIcon } from "../Icons";
import { useAuth } from "../context/AuthContext";
import CommentReplyForm from "./CommentReplyForm";

interface CommentActionButtonsProps {
  post_id: number
  votes_count: number,
  vote_type: 1|-1|null,
  submitVote: (id: number, vote_type: 1 | -1) => Promise<void>,
  subreddit_name?: string,
  comments_count?: number,
  parent_comment_id ?: number,
}

const CommentActionButtons = (
  { post_id, votes_count, vote_type, submitVote,
    subreddit_name, comments_count, parent_comment_id
  } : CommentActionButtonsProps) => {

  const [userVote, setUserVote] = useState<1 | -1 | null>(vote_type);
  const [voteCount, setVoteCount] = useState(votes_count);
  const { isAuthenticated } = useAuth();
  const [showReplyForm, setShowReplyForm] = useState(false);
  
  const handleVote = async (vote: 1|-1) => {
    if (!isAuthenticated) {
      alert("Log In");
      return;
    }
    let newVoteCount = voteCount;
    //say user vote -1 already
    //if user vote -1 to revert their vote null uservote
    //
    if (userVote === vote) {
      newVoteCount = voteCount - vote;
      setUserVote(null);
    } else {
      if (userVote === null) {
        newVoteCount = voteCount + vote; 
      } else {
        newVoteCount = voteCount + (vote * 2)
      }
      setUserVote(vote);
    }
    await submitVote(post_id, vote);
    setVoteCount(newVoteCount);
    console.log("Submiting Vote : ", vote)
    
  };
  useEffect(() => {
    setUserVote(vote_type);
    setVoteCount(votes_count);
  }, [vote_type, isAuthenticated]);
  
  return (
    <div className="flex flex-col">
      <div className="flex items-center  text-xs mt-1">
        {/* Vote Button */}
        <div className={`flex flex-row ml-2 py-2 bg-white
            ${userVote === 1 ? "bg-orange-500" : userVote === -1 ? "bg-blue-500" : "bg-slate-200"}`}
        >
          <button 
            className={`mr-2 hover:text-orange-500 ${userVote === 1? "bg-white": ""}`} 
            onClick={() => handleVote(1)}
          >
            <UpvoteIcon />
          </button>
          <div className="mr-2 text-xs font-[600]">{voteCount}</div>
          <button
            className="hover:text-blue-500"
            onClick={() => handleVote(-1)}
          >
            <DownvoteIcon />
          </button>
        </div>

        {/* Reply Button */}
        <button 
            onClick={() => setShowReplyForm((prev) => !prev)}
            className="ml-3"
        >
            <span className="text-xs font-semibold text-neutral-600">Reply</span>
        </button>

        {/* Share Button */}
        <button className="ml-3">
          <span className="text-xs font-semibold text-neutral-600">Share</span>
        </button>
      </div>
      { showReplyForm && (
        <CommentReplyForm 
          post_id={post_id} 
          parent_comment_id={parent_comment_id}
          setShowReplyForm={setShowReplyForm}
        />
      )}
    </div>
  )
}

export default CommentActionButtons;


  
