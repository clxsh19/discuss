import PostItem from './FeedItem';
import { PostItemProp } from '@/interface/PostProp';

const PostFeed = (posts: PostItemProp[]): JSX.Element => {
  return (
    <div>
      {posts.map((post, index) => {
        return (
          <PostItem key={index} {...post} />
        );
      })}
    </div>

  );
};

export default PostFeed;