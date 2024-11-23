import CommentItem from "./CommentItem";
import NestedComments from "./NestedComments";
import CommentActionButtons from "./CommentActionButtons";
import { submitCommentVote } from "@/lib/create_api";
import { useComments } from "../context/CommentContext";
import { buildCommentTree } from "@/lib/utils";

interface CommentsViewProp {
  post_id: number,
}

const CommentsView = ({ post_id }: CommentsViewProp) => {
  const { comments } = useComments();
  const nestedArray = buildCommentTree(comments);
  // console.log(nestedArray);

  return (
    <div className="p-4 bg-white w-11/12 my-4 mx-4 lg:w-9/12 rounded-t-lg overflow-hidden">
      { nestedArray.map((comment) => {
        const { user_id, comment_id, username, created_at, total_votes, vote_type, content, children } = comment;  
        return (
          <div key={`parent-${comment_id}`} className="mb-1 p- border-l-8 border-l-slate-300">
            <CommentItem
              comment_id={comment_id}
              username={username} 
              created_at={created_at}
              total_votes={total_votes}
              content={content}
            /> {/* remove ... maybe but why? i forgot*/}
            <CommentActionButtons
              comment_id={comment_id} user_id={user_id} post_id={post_id} comment={content}
              votes_count={total_votes} vote_type={vote_type} submitVote={submitCommentVote}
              username={username} parent_comment_id={comment_id}
            />
            { children && children.length > 0 && (
              <NestedComments 
                post_id={post_id}
                nestedCommments={children}
                level={1}
              /> 
            )}  
          </div>
        );
      })}
    </div>
  )
};

export default CommentsView;