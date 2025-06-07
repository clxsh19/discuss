import { postType } from "../PostProps"

export interface SwitchPostTypeProps {
  postType: postType;
  handleChange: (type: postType) => void;
}

export interface CreatePostProps {
  postType : postType,
  subName?: string,
}
