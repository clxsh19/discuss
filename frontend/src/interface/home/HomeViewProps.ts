import { PostItemProp } from "../PostProps"

export interface HomeViewProps {
  posts: PostItemProp[],
  hasMore: boolean
}
