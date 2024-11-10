import { MapCommentProp } from "@/interface/CommentProp";
import CommentItem from "./CommentItem";
import NestedComments from "./CommentTree";
import CommentActionButtons from "./CommentActionButtons";
import { submitCommentVote } from "@/lib/create_api";

interface CommentsViewProp {
  post_id: number,
  commentTree: MapCommentProp[],
}

const CommentsView = ({post_id, commentTree}: CommentsViewProp) => {
  return (
    <div className="p-4 bg-white w-11/12 my-4 mx-4 lg:w-9/12 rounded-t-lg overflow-hidden">
      { commentTree.map((comment, index) => {
        const { comment_id, username, created_at, total_votes, vote_type, content, children } = comment;  

        return (
          <div key={`parent-${comment_id}`} className="mb-1 p- border-l-8 border-l-slate-300">
            <CommentItem
              post_id={post_id}
              comment_id={comment_id}
              username={username}
              created_at={created_at}
              total_votes={total_votes}
              vote_type={vote_type}
              content={content}
            /> {/* remove ... maybe but why? i forgot*/}
            <CommentActionButtons
              post_id={post_id} votes_count={total_votes} 
              vote_type={vote_type} submitVote={submitCommentVote}
            />
            { comment.children && comment.children.length > 0 && (
              <NestedComments 
                post_id={post_id} 
                parent_comment_id={comment_id} 
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