import CommentItem from "./item/CommentItem";
import CommentActionButtons from "./action_buttons/CommentActionButtons";
import DeletedCommentItem from "./item/DeletedCommentItem"; // Import DeletedCommentItem
import { submitCommentVote } from "@/lib/create_api";
import { CommentItemProp } from "@/interface/CommentProp";

interface NestedCommentsProp {
  post_id: number;
  nestedCommments: CommentItemProp[];
  level: number;
}

const NestedComments = ({ post_id, nestedCommments, level }: NestedCommentsProp) => {

  const renderNestedComment = (comment: CommentItemProp) => {
    const { user_id, comment_id, username, created_at, total_votes, vote_type, content, children, deleted } = comment;

    return (
      <div key={`${comment_id}-${level}`} style={{ marginLeft: `${level * 4}px` }} className="relative mb-1 p-1 comment-wrapper">
        <div
          className="absolute left-0 top-0 h-full w-4 cursor-pointer border-l-8 border-l-slate-300 comment-border"
        ></div>
        
        {deleted ? (
          <DeletedCommentItem comment_id={comment_id} created_at={created_at} total_votes={total_votes} />
        ) : (
          <CommentItem
            comment_id={comment_id}
            username={username}
            created_at={created_at}
            total_votes={total_votes}
            content={content}
          />
        )}
        <div className="collapse-wrapper">
          {deleted ? (
            <div className="mt-1 ml-1 bg-neutral-50 text-xs text-neutral-700">
              <div className="">[ Comment deleted by user ]</div>
            </div>
          ) : (
            <>
              <div className="mt-2 ml-1 bg-neutral-50 text-sm text-neutral-900">
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
