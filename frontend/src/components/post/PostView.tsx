import CommentProviderContainer from "./CommentProviderContainer";
import FeedItem from "../feed/feedItem/FeedItem";
import { PostViewProps } from '@/interface/post/PostProps';

const PostView = ({ post, comments }: PostViewProps) => {
  const {
    subreddit_name, post_id, username, created_at, total_comments, title,
    total_votes, vote_type, post_type, text_content, media_url, link_url,
    link_img_url
  } = post[0];

  return (
    <div>
      <FeedItem
        post_id={post_id} title={title} subreddit_name={subreddit_name}
        username={username} created_at={created_at} total_comments={total_comments}
        total_votes={total_votes} vote_type={vote_type}
        post_type={post_type} text_content={text_content} media_url={media_url}
        link_url={link_url} link_img_url={link_img_url} sub_feed={true}
      />
      <CommentProviderContainer initialComments={comments} post_id={post_id} />
    </div>
  )
};


export default PostView;

