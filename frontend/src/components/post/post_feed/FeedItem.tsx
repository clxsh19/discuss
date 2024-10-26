import { PostItemProp } from '@/interface/PostProp';
import { getTimePassed } from '@/lib/utils';
import { CommentIcon, ShareIcon } from '@/components/Icons';
import Link from 'next/link';
import VoteButton from '@/components/ui/VoteButton';
import { submitPostVote } from '@/lib/create_api';

const FeedItem = ({
  post_id, 
  title,
  created_at,
  total_comments,
  total_votes, 
  vote_type,
  subreddit_name,
  link_url, 
  link_img_url,
}: PostItemProp) => {
  const timePassed = getTimePassed(created_at);
  const votes_count = total_votes == null ? 0 : total_votes;
  const comments_count = total_comments == null ? 0 : total_comments;

  return (
    <div className="relative w-[32rem] m-4 p-4 border border-slate-300 hover:border-slate-400 rounded-lg transition-all">
      
      {/* Main Post Link: Covers the entire post but stays behind other clickable elements */}
      <Link href={`/r/${subreddit_name}/comments/${post_id}`} className="absolute inset-0" aria-label="Post Link" />

      {/* Subreddit and Time Info */}
      <div className="flex items-center text-xs mb-2 space-x-1">
        <Link href={`/r/${subreddit_name}`} className="font-semibold text-blue-600 hover:underline relative">
          r/{subreddit_name}
        </Link>
        <span className="text-slate-500">•</span>
        <span className="text-slate-600">{timePassed} ago</span>
      </div>

      {/* Thumbnail and Title */}
      <div className="flex items-center mb-4">
        {/* Thumbnail */}
        <div className="w-[60px] h-[60px] mr-4 flex-shrink-0">
          {link_img_url && link_url ? (
            <Link href={link_url} target="_blank" rel="noopener noreferrer" className="relative z-10">
              <img
                src={link_img_url}
                alt="Thumbnail"
                className="w-full h-full rounded object-cover"
              />
            </Link>
          ) : (
            <div className="w-full h-full bg-gray-200 rounded" />
          )}
        </div>
        
        {/* Title */}
        <div className="font-medium text-sm flex-grow">
          {title}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex relative items-center space-x-4 text-xs z-10">
        {/* Voting Button */}
        <VoteButton id={post_id} votes_count={votes_count} vote_type={vote_type} submitVote={submitPostVote} />

        {/* Comment Button */}
        <Link href={`/r/${subreddit_name}/comments/${post_id}`} className="flex items-center bg-slate-200 px-3 py-1 rounded-2xl hover:bg-slate-300 relative">
          <CommentIcon />
          <span className="font-semibold">{comments_count}</span>
        </Link>

        {/* Share Button */}
        <button className="flex items-center bg-slate-200 px-3 py-1 rounded-2xl hover:bg-slate-300 relative">
          <ShareIcon />
          <span className="font-semibold">Share</span>
        </button>
      </div>
    </div>
  );
};

// export default FeedItem;
