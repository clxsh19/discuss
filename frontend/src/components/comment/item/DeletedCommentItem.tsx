import { getTimePassed } from '@/lib/utils';
import { CircleIcon } from '../../Icons';
import Link from 'next/link';

interface DeletedCommentItemProp {
  comment_id: number,
  created_at: string,
  total_votes: number,
}

const DeletedCommentItem = ({
  comment_id,
  created_at,
  total_votes
}: DeletedCommentItemProp) => {
  const timePassed = getTimePassed(created_at);
  return (
  <div className="pl-1 pt-0.5 mb-1" id={`${comment_id}`}>
    {/* Header with username, time, and icon */}
    <div className="flex items-center space-x-2 overflow-hidden">
      <div className="flex-shrink-0">
        <CircleIcon  /> {/* Adjust size to mimic Reddit icon size */}
      </div>
      <div className="truncate font-semibold text-xs text-neutral-800 hover:underline">
        [deleted]
      </div>
      <div className="text-neutral-500">•</div>
      <div className="text-xs text-neutral-500">{total_votes} points</div>
      <div className="text-neutral-500">•</div>
      <div className="text-xs text-neutral-500">
        <time>{timePassed}</time>
      </div>
    </div>

    {/* Comment content */}
  </div>
  )
};

export default DeletedCommentItem;
