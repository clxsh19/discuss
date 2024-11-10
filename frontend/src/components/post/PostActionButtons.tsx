'use client';

import { useState, useEffect } from "react";
import { DownvoteIcon, UpvoteIcon } from "../Icons";
import { useAuth } from "../context/AuthContext";
import { CommentIcon, ShareIcon } from "../Icons";
import CommentForm from "../comment/CommentReplyForm";
import Link from "next/link";

interface PostActionButtonsProps {
  post_id: number
  votes_count: number,
  vote_type: 1|-1|null,
  submitVote: (id: number, vote_type: 1 | -1) => Promise<void>,
  subreddit_name?: string,
  comments_count?: number,
}

const PostActionButtons = (
  { post_id, votes_count, vote_type, submitVote,
    subreddit_name, comments_count
  } : PostActionButtonsProps) => {

  const [userVote, setUserVote] = useState<1 | -1 | null>(vote_type);
  const [voteCount, setVoteCount] = useState(votes_count);
  const { isAuthenticated } = useAuth();
  
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
    <div className="flex relative items-center space-x-4 text-xs pl-2 py-1 z-10">
      {/* Vote Button */}
      <div className={`flex flex-row p-2 rounded-2xl bg-white
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
          className="mr-0.5 hover:text-blue-500"
          onClick={() => handleVote(-1)}
        >
          <DownvoteIcon />
        </button>
      </div>

      <Link href={`/r/${subreddit_name}/comments/${post_id}`} className="flex items-center px-3.5 py-1.5 rounded-2xl hover:bg-slate-300 relative">
        <CommentIcon />
        <span className="ml-2 font-semibold">{comments_count}</span>
      </Link>

      {/* Share Button */}
      <button className="flex items-center ml-2 px-3.5 py-1.5 rounded-2xl hover:bg-slate-300 relative">
        <ShareIcon />
        <span className=" ml-2 font-semibold">Share</span>
      </button>
    </div>

  )
}

export default PostActionButtons;


  
