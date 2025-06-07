import { PostItemProp } from "../PostProps";
import { CommentItemProp } from "../CommentProps";

export interface PostViewProps {
  post : PostItemProp[];
  comments: CommentItemProp[];
}

export interface CommentOnPostFormProps {
  post_id: number;
}

export interface CommentProviderContainerProps {
  initialComments: CommentItemProp[];
  post_id: number;
}
