import { CommentItemProp } from "../CommentProps";

export interface PostIdProp {
  post_id: number
}
  
export interface RenderCommentsProps {
  comment: CommentItemProp;
  post_id: number;
  level: number;
};

