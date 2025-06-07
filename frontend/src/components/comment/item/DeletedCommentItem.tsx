import { getTimePassed } from '@/lib/utils';
import { CircleIcon } from '../../Icons';
import { DeletedCommentItemProps } from '@/interface/comment/ItemProps';

const DeletedCommentItem = ({
  comment_id,
  created_at,
  total_votes
}: DeletedCommentItemProps) => {
  const timePassed = getTimePassed(created_at);
  return (
  <div className="ml-2 pl-1 pt-0.5 mb-1 text-neutral-300" id={`${comment_id}`}>
    {/* Header with username, time, and icon */}
    <div className="flex items-center space-x-2 overflow-hidden">
      <div className="flex-shrink-0">
        <CircleIcon  /> {/* Adjust size to mimic Reddit icon size */}
      </div>
      <div className="font-semibold text-xs text-red-400 hover:underline">
        [deleted]
      </div>
      <div>•</div>
      <div className="text-xs ">{total_votes} points</div>
      <div>•</div>
      <div className="text-xs ">
        <time>{timePassed}</time>
      </div>
    </div>

    {/* Comment content */}
  </div>
  )
};

export default DeletedCommentItem;
