'use client';

import { useState } from "react";
import { DownvoteIcon, UpvoteIcon } from "../Icons"

interface VoteButtonProps {
  post_id: number
  votes_count: number,
  submitVote: (id: number, vote_type: 1 | -1) => void
}

const VoteButton = ({ post_id, votes_count, submitVote }: VoteButtonProps) => {
  const [userVote, setUserVote] = useState<1 | -1 | null>(null);

  const handleVote = (vote: 1|-1) => {
    if (userVote === vote) {
      setUserVote(null);
    } else {
      setUserVote(vote);
    }
    submitVote(post_id, vote);
  };
  
  return (
    <div 
      className={`flex flex-row p-2 mr-2 rounded-2xl 
                  ${userVote === 1 ? "bg-orange-500" : userVote === -1 ? "bg-blue-500" : "bg-slate-200"}`}
    >
      <button 
        className={`mr-2 hover:text-orange-500 ${userVote === 1? "bg-white": ""}`} 
        onClick={() => handleVote(1)}
      >
        <UpvoteIcon />
      </button>
      <div className="mr-2 text-xs font-[600]">{votes_count}</div>
      <button
        className="mr-0.5 hover:text-blue-500"
        onClick={() => handleVote(-1)}
      >
        <DownvoteIcon />
      </button>
    </div>

  )
}

export default VoteButton;
