import { getTimePassed } from '@/lib/utils';
import { CircleIcon } from '../../Icons';
import Link from 'next/link';

interface CommentItemProp {
  comment_id: number,
  username: string,
  created_at: string,
  total_votes: number,
  content: string,
}

const CommentItem = ({
  comment_id,
  created_at,
  username,
}: CommentItemProp) => {
  const timePassed = getTimePassed(created_at);
  return (
  <div className="pl-1 pt-1" id={`${comment_id}`}>
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

  </div>
  )
};

export default CommentItem;
