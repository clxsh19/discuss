import { CommentItemProp } from '@/interface/CommentProp';
import { getTimePassed } from '@/lib/utils';
import { CircleIcon } from '../Icons';
import Link from 'next/link';

const CommentItem = ({
  comment_id,
  created_at,
  username,
  total_votes,
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
  </div>
  )
};

export default CommentItem;