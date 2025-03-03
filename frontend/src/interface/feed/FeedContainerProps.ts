import { PostItemProp } from "../PostProps";

export interface FeedContainerProps {
  initialPosts: PostItemProp[];
  initialHasMore: boolean;
  subName?: string;
}
