'use client';

import { useState, useEffect } from "react";
import { DownvoteIcon, UpvoteIcon } from "../Icons";
import { useAuth } from "../context/AuthContext";

interface VoteButtonProps {
  id: number
  votes_count: number,
  vote_type: 1|-1|null,
  submitVote: (id: number, vote_type: 1 | -1) => Promise<void>,
  className?: string,
}

const VoteButton = ({ id, votes_count, vote_type, submitVote, className }: VoteButtonProps) => {
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
    await submitVote(id, vote);
    setVoteCount(newVoteCount);
    console.log("Submiting Vote : ", vote)
    
  };
  useEffect(() => {
    // console.log('effect: ', vote_type)
    setUserVote(vote_type);
    setVoteCount(votes_count);
  }, [vote_type, isAuthenticated]);
  
  return (
    <div 
      className={`flex flex-row  rounded-2xl ${className}
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

  )
}

export default VoteButton;
