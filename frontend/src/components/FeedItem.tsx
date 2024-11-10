import { PostItemProp } from '@/interface/PostProp';
import { getTimePassed } from '@/lib/utils';
import { CommentIcon, ShareIcon } from '@/components/Icons';
import Link from 'next/link';
import VoteButton from '@/components/ui/VoteButton';
import { submitPostVote } from '@/lib/create_api';

const FeedItem = ({
  post_id, title,
  created_at, total_comments,
  total_votes, vote_type,
  username, subreddit_name,
  post_type, text_content,
  link_url, link_img_url,
  media_url
}: PostItemProp) => {
  const timePassed = getTimePassed(created_at); 
  const votes_count = total_votes == null ? 0 : total_votes;
  const comments_count = total_comments == null ? 0 : total_comments;

  let thumbnail_url;
  let isVideo;
  if ( post_type === 'MEDIA') {
    thumbnail_url = `http://localhost:5000/${media_url}`;
    isVideo = media_url?.match(/\.(mp4|webm|ogg)$/i);
  } else if ( post_type === 'LINK') {
    thumbnail_url = link_img_url;
  }

  return (
    <div className="flex relative w-full px-4 py-2 border border-slate-300 bg-white hover:border-slate-400 transition-all">
      
      {/* Post Link: Covers the entire post but stays behind other clickable elements */}
      <Link href={`/r/${subreddit_name}/comments/${post_id}`} className="absolute inset-0" aria-label="Post Link" />

      {/* Thumbnail */}
      <div className="w-[85px] h-[85px] mr-4 flex-shrink-0">
        {thumbnail_url ? (
          <Link href={`/`} target="_blank" rel="noopener noreferrer" className="relative z-10">
            {isVideo ? (
              <video src={thumbnail_url} className="w-full h-full rounded object-cover"/>
            ) : (
              <img src={thumbnail_url} alt="Thumbnail" className="w-full h-full rounded object-cover" />
            )}
          </Link>
        ) : (
          <div className="w-full h-full bg-gray-200 rounded" />
        )}
      </div>
      
      <div className='flex flex-col'>
        {/* Title */}
        <div className="font-medium text-sm flex-grow">
          {title}
        </div>

        {/* Link */}
        {link_url ? (
          <Link href={link_url} className="text-xs text-blue-500">
            {link_url.length > 30 ? `${link_url.slice(0, 30)}...` : link_url}
          </Link>
        ) : null}
          
        {/* Sub Name and Time Info */}
        <div className="flex items-center text-xs mb-2 space-x-1">
          {/* Username */}
          <Link href={`/r/${username}`} className='hover:underline'>
            u/{username}
          </Link>
          <div className='text-slate-600 text-xs'>
            posted to
          </div>
          <Link href={`/r/${subreddit_name}`} className="font-semibold text-blue-600 hover:underline relative">
            r/{subreddit_name}
          </Link>
          <span className="text-slate-500">•</span>
          <span className="text-slate-600">{timePassed} ago</span>
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
    </div>
  );
};

export default FeedItem;
