import { CommentItemProp } from '@/interface/CommentProp';
import { getTimePassed } from '@/lib/utils';
import { CircleIcon } from '../Icons';
import VoteButton from '../ui/VoteButton';
import Link from 'next/link';
import { submitCommentVote } from '@/lib/create_api';

const CommentItem = ({
  post_id,
  comment_id,
  created_at,
  username,
  total_votes,
  vote_type,
  content
}: CommentItemProp) => {
  const timePassed = getTimePassed(created_at);
  const votes_amt = (total_votes == null) ? 0 : total_votes;
  return (
  <div id={`${comment_id}`}>
    {/* Header with username, time, and icon */}
    <div className="flex items-center space-x-2 overflow-hidden">
      <Link href={'#'} className="flex-shrink-0">
        <CircleIcon  /> {/* Adjust size to mimic Reddit icon size */}
      </Link>
      <Link href={'#'} className="truncate font-bold text-sm text-neutral-800 hover:underline">
        {username}
      </Link>
      <div className="text-neutral-500">•</div>
      <div className="text-xs text-neutral-500">
        <time>{timePassed}</time>
      </div>
    </div>

    {/* Comment content */}
    <div className="mt-2 bg-neutral-50 text-sm text-neutral-900 rounded-md p-2">
      <pre className="whitespace-pre-wrap break-words">{content}</pre> {/* Preserve line breaks and ensure content wraps */}
    </div>
    <VoteButton id={comment_id} votes_count={total_votes} vote_type={vote_type} submitVote={submitCommentVote}/>
  </div>
  )
};

export default CommentItem;

// SELECT
//     c.comment_id,
//     c.user_id AS user_id,
//     c.parent_comment_id AS parent_id,
//     u.username AS username,
//     c.vote_count AS total_votes,
//     COALESCE(cv.vote_type, null) AS vote_type

//     FROM comments c
//     LEFT JOIN users u ON c.user_id = u.user_id
//     LEFT JOIN comment_votes cv ON c.comment_id = cv.comment_id
//     AND cv.user_id = 3
//     WHERE c.post_id = 25;