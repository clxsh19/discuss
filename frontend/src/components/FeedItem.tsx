import { PostItemProp } from '@/interface/PostProp';
import { getTimePassed } from '@/lib/utils';
import { LinkIcon} from '@/components/Icons';
import Link from 'next/link';
import VoteButton from '@/components/ui/VoteButton';
import { submitPostVote } from '@/lib/create_api';
import FeedActionButtons from './ui/FeedActionButtons';

const FeedItem = ({
  post_id, title, created_at, 
  total_comments, total_votes, vote_type,
  username, subreddit_name,
  post_type, text_content,
  link_url, link_img_url, media_url,
  sub_feed
}: PostItemProp) => {
  const timePassed = getTimePassed(created_at); 
  const votes_count = total_votes == null ? 0 : total_votes;
  const comments_count = total_comments == null ? 0 : total_comments;

  let thumbnail_url;
  let isVideo;
  if ( post_type === 'MEDIA') {
    thumbnail_url = `http://localhost:5000/${media_url}`;
    isVideo = media_url?.match(/\.(mp4|webm|ogg)$/i); // check if url is for a video by checking it's format
  } else if ( post_type === 'LINK') {
    thumbnail_url = link_img_url;
  }

  return (
    <div className="w-full flex pt-2 pb-5 border-b border-neutral-800 ">
      
      {/* Voting Button */}
      <div className='flex flex-col items-center -space-y-1'>
        <VoteButton 
          id={post_id} 
          votes_count={votes_count} 
          vote_type={vote_type} 
          submitVote={submitPostVote}
        />
      </div>
      
      {/* Thumbnail */}
      <div className="w-[80px] h-[80px] ml-2 rounded flex-shrink-0">
        {thumbnail_url ? (
          <Link href={`/`} target="_blank" rel="noopener noreferrer">
            {isVideo ? (
              <video src={thumbnail_url} className="w-full h-full object-cover"/>
            ) : (
              <img src={thumbnail_url} alt="Thumbnail" className="w-full h-full object-cover" />
            )}
          </Link>
        ) : (
          <div className="w-full h-full bg-gray-200 rounded" />
        )}
      </div>
      
      <div className='flex flex-col space-y-1 ml-3'>
        {/* Title */}
        <div className="text-gray-100 font-medium text-lg">
          {title}
        </div>

        {/* Link */}
        <div className=''>
          {link_url ? (
            <Link href={link_url} className="flex text-xs font-mono italic text-neutral-400 hover:text-neutral-200">
              <LinkIcon style=""/>
              <span> {link_url.length > 30 ? `${link_url.slice(0, 30)}...` : link_url} </span>
            </Link>
          ) : null}
        </div>
          
        {/* Sub Name and Time Info */}
        <div className="flex items-center text-xs font-mono space-x-1">
          <div className='text-white text-xs'>
            submitted by
          </div>
          {/* Username */}
          <Link href={`/d/${username}`} className='text-green-400 hover:underline'>
            u/{username}
          </Link>
          {!sub_feed && (
            <>
              <div className="text-white text-xs">
                to
              </div>
              <Link href={`/d/${subreddit_name}`} className="font-semibold text-blue-600 hover:underline">
                d/{subreddit_name}
              </Link>
            </>
          )}
          <span className="text-white">•</span>
          <span className="text-white">{timePassed}</span>
        </div>

        {/* Action Buttons */}
        <FeedActionButtons 
          post_type={post_type} sub_name={subreddit_name} post_id={post_id} 
          media_url={thumbnail_url} isVideo={isVideo} text_content={text_content}
          comments_count={comments_count} 
        />
      </div>
    </div>
  );
};

export default FeedItem;
