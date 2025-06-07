import Link from 'next/link';
import { PostItemProp } from '@/interface/PostProps';
import { getTimePassed } from '@/lib/utils';
import { submitPostVote } from '@/lib/create_api';
import { LinkIcon } from '@/components/Icons';
import VoteButton from '@/components/ui/VoteButton';
import FeedActionButtons from './FeedActionButtons';
import FeedThumbnail from './FeedThumbnail';

const videoExtensions = ['.mp4', '.webm', '.ogg'];

const FeedItem = ({
  post_id, title, created_at, total_comments,
  total_votes, vote_type, username, subreddit_name,
  post_type, text_content, link_url, link_img_url,
  media_url, sub_feed
}: PostItemProp) => {
  const timePassed = getTimePassed(created_at);
  const votes_count = total_votes == null ? 0 : total_votes;
  const comments_count = total_comments == null ? 0 : total_comments;
  const isVideo = !!(media_url && videoExtensions.some(ext => media_url.toLowerCase().endsWith(ext)));
  const thumbnailUrl = post_type === 'MEDIA' ? media_url : link_img_url;

  return (
    <div className="w-full flex pt-2 pb-5 border-b border-neutral-800 ">

      {/* Voting Button */}
      <VoteButton
        id={post_id}
        votes_count={votes_count}
        vote_type={vote_type}
        isVertical={true}
        submitVote={submitPostVote}
      />

      {/* Thumbnail */}
      <div className="w-[80px] h-[80px] ml-2 rounded flex-shrink-0">
        <Link href={`/d/${subreddit_name}/${post_id}`}>
          <FeedThumbnail
            postType={post_type}
            thumbnailUrl={thumbnailUrl}
            isVideo={isVideo}
          />
        </Link>
      </div>


      <div className='flex flex-col space-y-1 ml-3'>
        {/* Title */}
        <div className="text-gray-100 font-medium text-lg">
          {title}
        </div>

        {/* Link */}
        <div className=''>
          {link_url && (
            <Link href={link_url} className="flex text-xs font-mono italic text-neutral-400 hover:text-neutral-200">
              <LinkIcon style="" />
              <span> {link_url.length > 30 ? `${link_url.slice(0, 30)}...` : link_url} </span>
            </Link>
          )}
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
          postType={post_type} subName={subreddit_name} postId={post_id}
          mediaUrl={thumbnailUrl} isVideo={isVideo} textContent={text_content}
          commentsCount={comments_count} subFeed={sub_feed}
        />
      </div>
    </div>
  );
};

export default FeedItem;
