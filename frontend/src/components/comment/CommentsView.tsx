import { useEffect } from "react";
import CommentItem from "./item/CommentItem";
import NestedComments from "./NestedComments";
import CommentActionButtons from "./action_buttons/CommentActionButtons";
import DeletedCommentItem from "./item/DeletedCommentItem";
import { submitCommentVote } from "@/lib/create_api";
import { useComments } from "../context/CommentContext";
import { buildCommentTree } from "@/lib/utils";
import { CommentItemProp } from "@/interface/CommentProps";

interface CommentsViewProp {
  post_id: number;
}

const CommentsView = ({ post_id }: CommentsViewProp) => {
  const { comments } = useComments();
  const nestedArray = buildCommentTree(comments);

  useEffect(() => {
    const container = document.querySelector("#comments-container");
  
    const toggleCollapse = (e: Event) => {
      const target = e.target as HTMLElement;
      console.log(target)
  
      if (target.classList.contains("comment-border")) {
        // Get the nearest collapse-wrapper from clicked border.
        const commentWrapper = target.closest('.comment-wrapper');
        const contentDiv = commentWrapper?.querySelector('.collapse-wrapper');
        if (contentDiv) {
          contentDiv.classList.toggle("hidden"); // Tailwind's hidden class toggles visibility.
        }
      }
    };
  
    container?.addEventListener("click", toggleCollapse);
  
    return () => {
      container?.removeEventListener("click", toggleCollapse);
    };
  }, []); 
  

  // Function to render a single comment
  const renderComment = (comment: CommentItemProp) => {
    const { user_id, comment_id, username, created_at, total_votes, vote_type, content, children, deleted } = comment;

    return (
      <div key={`parent-${comment_id}`} className="relative mb-1 p-1 comment-wrapper border-t border-t-neutral-800">
          {/* collapsable comment-border */}
          <div 
            className="absolute -left-1 top-0 h-full w-4 cursor-pointer border-l-8 border-l-neutral-700 comment-border"
          >
          </div>
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
              <div className="ml-3 text-xs text-neutral-300">
                <div className="">[ Comment deleted by user ]</div> 
              </div>
            ) : (
              <>
                <div className="ml-3 text-sm text-white">
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
              <NestedComments post_id={post_id} nestedCommments={children} level={2} />
            )}
          </div>
      </div>
    );
  };

  return (
    <div id="comments-container" className="my-4 overflow-hidden">
      {nestedArray.map(renderComment)}
    </div>
  );
};

export default CommentsView;
