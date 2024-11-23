'use client';

import { CommentIcon, ShareIcon } from "../Icons";
import VoteButton from "../ui/VoteButton";
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
  return (
    <div className="flex relative items-center space-x-4 text-xs pl-2 py-1 z-10">
      {/* Vote Button */}
      <VoteButton 
        id={post_id}
        votes_count={votes_count}
        vote_type={vote_type}
        submitVote={submitVote}
        className="p-2 bg-white"
      />

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


  
