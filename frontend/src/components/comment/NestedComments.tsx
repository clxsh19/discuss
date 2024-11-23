import CommentItem from "./CommentItem";
import CommentActionButtons from "./CommentActionButtons";
import { submitCommentVote } from "@/lib/create_api";
import { CommentItemProp } from "@/interface/CommentProp";

interface NestedCommentsProp {
  post_id: number;
  nestedCommments: CommentItemProp[];
  level: number;
}

const NestedComments = ({ post_id, nestedCommments, level }: NestedCommentsProp) => {
  return (
    <>
    {nestedCommments.map((comment) => {
      const { user_id, comment_id, username, created_at, total_votes, vote_type, content, children } = comment;
      return (
        <div key={`${comment_id}-${level}`} style={{ marginLeft: `${level * 4}px` }} className="mb-1 p-1 border-l-8 border-l-slate-300">
          <CommentItem
            comment_id={comment_id}
            username={username}
            created_at={created_at}
            total_votes={total_votes}
            content={content}
          />
          <CommentActionButtons
            comment_id={comment_id} user_id={user_id} post_id={post_id} comment={content}
            votes_count={total_votes} vote_type={vote_type} submitVote={submitCommentVote}
            username={username} parent_comment_id={comment_id}
          />
          {children && children.length > 0 && (
            <NestedComments
              post_id={post_id}
              nestedCommments={children}
              level={level + 1}
            />
          )}
        </div>
      );
    })}
    </>
  );
};

export default NestedComments;
