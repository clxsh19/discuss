import { MapCommentProp } from "@/interface/CommentProp";
import CommentItem from "./CommentItem";
import CommentForm from "./CommentForm";

interface CommentTreeProp {
  post_id: number,
  parent_comment_id?: number,
  commentTree: MapCommentProp[],
  level?: number,
}

const CommentTree = ({post_id, parent_comment_id, commentTree, level=0}: CommentTreeProp) => {

  return (
    <div className="ml-4">
      { commentTree.map((comment, index) => {
        const comment_data = {
          comment_id: comment.comment_id,
          username: comment.username,
          created_at: comment.created_at,
          total_votes: comment.total_votes,
          content: comment.content
        }
        return (
          <div key={index} className={`ml-${level*4}`}>
            <CommentItem {...comment_data} />
            <CommentForm post_id={post_id} parent_comment_id={parent_comment_id} />
            {comment.children && comment.children.length > 0 && (
              <CommentTree post_id={post_id} parent_comment_id={comment.comment_id} commentTree={comment.children} level={level+1}/>
            )}  
          </div>
        );
      })}
    </div>
  )
};

export default CommentTree;