import { useEffect } from "react";
import { useComments } from "../context/CommentContext";
import { buildCommentTree } from "@/lib/utils";
import RenderComment from "./RenderComment";
import { PostIdProp } from "@/interface/comment/CommentContainerProps";

const Comments = ({ post_id }: PostIdProp) => {
  const { comments } = useComments();
  const nestedArray = buildCommentTree(comments);

  useEffect(() => {
    const container = document.querySelector("#comments-container");

    const toggleCollapse = (e: Event) => {
      const target = e.target as HTMLElement;

      if (target.classList.contains("comment-border")) {
        // Get the nearest collapse-wrapper from clicked border.
        const commentWrapper = target.closest('.comment-wrapper');
        const contentDiv = commentWrapper?.querySelector('.collapse-wrapper');
        const icon = target.querySelector('div');
        if (contentDiv) {
          contentDiv.classList.toggle("hidden"); //tailwind hidden class toggles visibility.
          if (icon) {
            icon.textContent = contentDiv.classList.contains("hidden") ? "+" : "−";
          }
        }
      }
    };

    container?.addEventListener("click", toggleCollapse);

    return () => {
      container?.removeEventListener("click", toggleCollapse);
    };
  }, []);

  return (
    <div id="comments-container" className="my-4 overflow-hidden">
      {nestedArray.map((comment) => (
        <RenderComment
          key={`0-parent-${comment.comment_id}`}
          comment={comment}
          post_id={post_id}
          level={0}
        />
      ))}
    </div>
  );
};

export default Comments;
