import { PostItemProp } from "@/interface/PostProps";
import { CommentItemProp } from "@/interface/CommentProps";
import { getTimePassed } from '@/lib/utils';
import CommentProviderContainer from "./CommentProviderContainer";
import FeedItem from "../feed/feedtem/FeedItem";

export interface PostViewProp {
  post : PostItemProp[],
  comments: CommentItemProp[]
}

const PostView = ({post, comments} : PostViewProp) => {
  const { 
    subreddit_name, post_id, username, created_at, total_comments, title,
    total_votes, vote_type, post_type, text_content, media_url, link_url,
    link_img_url
  } = post[0];
  
  const timePassed = getTimePassed(created_at);
  const votes_count = (total_votes == null) ? 0 : total_votes;
  const comments_count = (total_comments == null) ? 0 : total_comments;

  return (
    <>
      <FeedItem 
        post_id={post_id} title={title} subreddit_name={subreddit_name}
        username={username} created_at={timePassed} total_comments={comments_count} 
        total_votes={votes_count} vote_type={vote_type}
        post_type={post_type} text_content={text_content} media_url={media_url}
        link_url={link_url} link_img_url={link_img_url} sub_feed={true} 
      />
      <CommentProviderContainer initialComments={comments} post_id={post_id}/>      
    </>
  )
};


export default PostView;

