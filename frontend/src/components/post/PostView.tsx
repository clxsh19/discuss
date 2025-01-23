import { PostItemProp } from "@/interface/PostProp";
import { CommentItemProp } from "@/interface/CommentProp";
import { getTimePassed } from '@/lib/utils';
import CommentProviderContainer from "./CommentProviderContainer";
import FeedItem from "../FeedItem";

import { submitPostVote } from "@/lib/create_api";
import Link from "next/link";

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
    <div className="w-4/5 flex p-2 mt-2 mx-auto">
      <div className="w-4/6 mt-4">
        <FeedItem 
          post_id={post_id} title={title} subreddit_name={subreddit_name}
          username={username} created_at={timePassed} total_comments={comments_count} 
          total_votes={votes_count} vote_type={vote_type}
          post_type={post_type} text_content={text_content} media_url={media_url}
          link_url={link_url} link_img_url={link_img_url} sub_feed={true} 
        />
        <CommentProviderContainer initialComments={comments} post_id={post_id}/>
      </div>
      
    </div>
  )
};


export default PostView;

