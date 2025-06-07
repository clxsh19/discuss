import CommentActionButtons from "./action_buttons/CommentActionButtons";
import { submitCommentVote } from "@/lib/create_api";
import DeletedCommentItem from "./item/DeletedCommentItem";
import CommentItem from "./item/CommentItem";
import { RenderCommentsProps } from "@/interface/comment/CommentContainerProps";

const RenderComment = ({
  comment,
  post_id,
  level
}: RenderCommentsProps) => {
  const {
    user_id, comment_id,
    username, created_at,
    total_votes, vote_type,
    content, children,
    deleted
  } = comment;

  // const key = level == 0 ? `${level}-parent-${comment_id}` : `${level}-children${comment_id}`;
  const marginStyle = level === 0 ? 'mb-1' : 'ml-3 my-3';
  const borderStyle = level === 0 ? '-left-1 border-l-8' : 'left-0 border-l-4'
  const borderColorStyle = (level % 2 === 0) ? 'border-l-stone-500' : 'border-l-neutral-600';
  return (
    <div className={`relative ${marginStyle} p-1 comment-wrapper border-t border-t-neutral-800`}>
      {/* collapsable comment-border */}
      <div
        className={`absolute top-0 h-full w-4 cursor-pointer text-white ${borderStyle} ${borderColorStyle} comment-border`}
      >
        <div className="absolute top-2 -left-0.5 bg-neutral-950 w-3 h-3 flex items-center justify-center text-white text-sm">
          {deleted ? '+' : '-'}
        </div>
      </div>

      {deleted ? (
        <DeletedCommentItem
          comment_id={comment_id}
          created_at={created_at}
          total_votes={total_votes}
        />
      ) : (
        <CommentItem
          comment_id={comment_id}
          username={username}
          created_at={created_at}
          total_votes={total_votes}
        />
      )}

      {/* collapse-wrapper classlist gets toggled hidden  */}
      <div className={`mt-2 collapse-wrapper  ${deleted ? 'hidden' : ''}`}>
        <div className="ml-3 text-white text-xs">
          {deleted ? (
            <div className="">[ Comment deleted by user ]</div>
          ) : (
            <pre className="whitespace-pre-wrap break-words">{content}</pre>
          )}
        </div>

        {!deleted && (
          <CommentActionButtons
            comment_id={comment_id}
            user_id={user_id}
            post_id={post_id}
            comment={content}
            votes_count={total_votes}
            vote_type={vote_type}
            submitVote={submitCommentVote}
            // username={username}
            parent_comment_id={comment_id}
          />
        )}

        {/* Children comments rendered recursively*/}
        {(children && children.length > 0) && (
          children.map((comment) => (
            <RenderComment
              key={`${level}-children-${comment.comment_id}`}
              post_id={post_id}
              comment={comment}
              level={level + 1}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default RenderComment;
