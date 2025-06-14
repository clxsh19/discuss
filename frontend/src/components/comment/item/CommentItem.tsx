import { getTimePassed } from '@/lib/utils';
import { CircleIcon } from '../../Icons';
import Link from 'next/link';
import { CommentItemProps } from '@/interface/comment/ItemProps';

const CommentItem = ({
  comment_id,
  created_at,
  username,
  total_votes
}: CommentItemProps) => {
  const timePassed = getTimePassed(created_at);
  return (
  <div className="ml-2 pl-1 pt-1 text-neutral-300" id={`${comment_id}`}>
    {/* Header with username, time, and icon */}
    <div className="flex items-center space-x-2 overflow-hidden">
      <Link href={'#'} className="flex-shrink-0">
        <CircleIcon  />
      </Link>
      <Link href={'#'} className="ml-2 font-mono text-xs text-green-400 hover:underline">
        {username}
      </Link>
      <div>•</div>
      <div className="text-xs ">{total_votes} points</div>
      <div>•</div>
      <div className="text-xs ">
        <time>{timePassed}</time>
      </div>
    </div>

  </div>
  )
};

export default CommentItem;
