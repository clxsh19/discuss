import CommentItem from "./item/CommentItem";
import CommentActionButtons from "./action_buttons/CommentActionButtons";
import DeletedCommentItem from "./item/DeletedCommentItem"; // Import DeletedCommentItem
import { submitCommentVote } from "@/lib/create_api";
import { CommentItemProp } from "@/interface/CommentProps";

interface NestedCommentsProp {
  post_id: number;
  nestedCommments: CommentItemProp[];
  level: number;
}

const NestedComments = ({ post_id, nestedCommments, level }: NestedCommentsProp) => {

  const renderNestedComment = (comment: CommentItemProp) => {
    const { user_id, comment_id, username, created_at, total_votes, vote_type, content, children, deleted } = comment;
// style={{ marginLeft: `${level * 4}px` }}
    return (
      <div key={`${comment_id}-${level}`}  className="relative ml-3 my-3 p-1 comment-wrapper border-t border-t-neutral-800">
        {/* collapsable comment-border */}
        <div
          className={`absolute left-0 top-0 h-full w-4 cursor-pointer border-l-4 ${ (level%2) === 0 ? 'border-l-zinc-500' : 'border-l-neutral-600' } comment-border`}
        ></div>
        
        {deleted ? (
          <DeletedCommentItem comment_id={comment_id} created_at={created_at} total_votes={total_votes} />
        ) : (
          <CommentItem
            comment_id={comment_id}
            username={username}
            created_at={created_at}
            total_votes={total_votes}
          />
        )}
        <div className="mt-2 collapse-wrapper">
          {deleted ? (
            <div className="ml-3 text-white text-xs">
              <div className="">[ Comment deleted by user ]</div>
            </div>
          ) : (
            <>
              <div className="ml-3 text-white text-sm">
                <pre className="whitespace-pre-wrap break-words">{content}</pre> 
              </div>
              <CommentActionButtons
                comment_id={comment_id}
                user_id={user_id}
                post_id={post_id}
                comment={content}
                votes_count={total_votes}
                vote_type={vote_type}
                submitVote={submitCommentVote}
                username={username}
                parent_comment_id={comment_id}
              />
            </>
          )}
          {children && children.length > 0 && (
            <NestedComments post_id={post_id} nestedCommments={children} level={level + 1} />
          )}
        </div>
      </div>
    );
  };

  return <>{nestedCommments.map(renderNestedComment)}</>;
};

export default NestedComments;
