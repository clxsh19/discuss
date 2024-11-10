import { MapCommentProp } from "@/interface/CommentProp";
import CommentItem from "./CommentItem";
import CommentActionButtons from "./CommentActionButtons";
import { submitCommentVote } from "@/lib/create_api";

interface NestedCommentsProp {
  post_id: number;
  parent_comment_id: number;
  nestedCommments: MapCommentProp[];
  level: number;
}

const NestedComments = ({ post_id, parent_comment_id, nestedCommments, level }: NestedCommentsProp) => {
  return (
    <>
    {nestedCommments.map((comment) => {
      const { comment_id, username, created_at, total_votes, vote_type, content, children } = comment;
      return (
        <div key={`${comment_id}-${level}`} style={{ marginLeft: `${level * 4}px` }} className="mb-1 p-1 border-l-8 border-l-slate-300">
          <CommentItem
            post_id={post_id}
            comment_id={comment_id}
            username={username}
            created_at={created_at}
            total_votes={total_votes}
            vote_type={vote_type}
            content={content}
          />
          <CommentActionButtons
            post_id={post_id}
            votes_count={total_votes}
            vote_type={vote_type}
            parent_comment_id={parent_comment_id}
            submitVote={submitCommentVote}
          />
          {children && children.length > 0 && (
            <NestedComments
              post_id={post_id}
              parent_comment_id={comment_id}
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
