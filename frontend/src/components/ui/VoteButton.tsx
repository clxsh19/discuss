'use client';

import { useState, useEffect } from "react";
import { DownvoteIcon, UpvoteIcon } from "../Icons";
import { useAuth } from "../context/AuthContext";
import { showErrorToast } from "./toasts";

interface VoteButtonProps {
  id: number
  votes_count: number,
  vote_type: 1 | -1 | null,
  submitVote: (id: number, vote_type: 1 | -1) => Promise<void>,
}

const VoteButton = ({ id, votes_count, vote_type, submitVote }: VoteButtonProps) => {
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
    <>
      <button onClick={() => handleVote(1)}>
        <UpvoteIcon style={`${(userVote === 1) ? 'text-blue-600':' text-neutral-400 hover:text-blue-500'} `} />
      </button>
      <div className="text-sm text-gray-400 font-[500]">{voteCount}</div>
      <button onClick={() => handleVote(-1)}>
        <DownvoteIcon style={`${(userVote === -1) ? 'text-red-600':' text-neutral-400 hover:text-red-500'} `} />
      </button>
    </>
  )
}

export default VoteButton;
