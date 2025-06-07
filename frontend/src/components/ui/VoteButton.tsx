'use client';

import { useState, useEffect } from "react";
import { DownvoteIcon, UpvoteIcon } from "../Icons";
import { useAuth } from "../context/AuthContext";
import { showErrorToast } from "./Toasts";
import VoteButtonProps from "@/interface/ui/VoteButtonProps";

const VoteButton = ({ 
  id, votes_count, 
  vote_type, isVertical,
  submitVote 
} : VoteButtonProps) => {
  const [userVote, setUserVote] = useState<1 | -1 | null>(vote_type);
  const [voteCount, setVoteCount] = useState(votes_count);
  const { isAuthenticated } = useAuth();
  
  const handleVote = async (vote: -1 | 1) => {
    if (!isAuthenticated) {
      showErrorToast("You must be logged in to vote.");
      return;
    }
    
    let newVoteCount = voteCount;
    let newVote = null;
    //say user vote = -1 and if user vote again vote -1, then vote = null 
    if (userVote === vote) {
      newVoteCount = voteCount - vote;
      newVote = null;
    } else {
      if (userVote === null) {
        newVoteCount = voteCount + vote; 
      } else {
        newVoteCount = voteCount + (vote * 2) 
      }
      newVote = vote;
    }

    try {
      await submitVote(id, vote);
      setVoteCount(newVoteCount);
      setUserVote(newVote);
    } catch (err) {
      showErrorToast('Failed to vote.')
    }
  };

  useEffect(() => {
    // console.log('effect: ', vote_type)
    setUserVote(vote_type);
    setVoteCount(votes_count);
  }, [vote_type, isAuthenticated]);
  
  return (
    <div className={`p-1 flex ${isVertical ? 'flex-col space-y-0.5' : 'space-x-0.5'} items-center`}>
      <button onClick={() => handleVote(1)}>
        <UpvoteIcon style={`${(userVote === 1) ? 'text-blue-600':' text-neutral-400 hover:text-blue-500'} `} />
      </button>
      <div className="text-sm text-gray-400 font-[500],">{voteCount}</div>
      <button onClick={() => handleVote(-1)}>
        <DownvoteIcon style={`${(userVote === -1) ? 'text-red-600':' text-neutral-400 hover:text-red-500'} `} />
      </button>
    </div>
  )
}

export default VoteButton;
