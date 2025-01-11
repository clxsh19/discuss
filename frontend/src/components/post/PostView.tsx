import { PostItemProp } from "@/interface/PostProp";
import { CommentItemProp } from "@/interface/CommentProp";
import { getTimePassed } from '@/lib/utils';
import CommentProviderContainer from "./CommentProviderContainer";
import PostActionButtons from "./PostActionButtons";
import ExpandMedia from "../ui/ExpandMedia";
import SubHeader from "../SubHeader";

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

  let thumbnail_url;
  let isVideo;
  if ( post_type === 'MEDIA') {
    thumbnail_url = `http://localhost:5000/${media_url}` || "";
    isVideo = media_url?.match(/\.(mp4|webm|ogg)$/i);
  } else if ( post_type === 'LINK') {
    thumbnail_url = link_img_url || "";
  }

  return (
    <div className="">
      {/* Subreddit header */}
      <SubHeader link_banner_url={thumbnail_url} link_logo_url={thumbnail_url} sub_name={subreddit_name}/>
      {/* Thummbnail And Post Info */}
      <div className="flex p-4 mt-4 bg-white w-11/12 mx-4 lg:w-9/12 overflow-hidden">
        <div className="w-[85px] h-[85px] mr-4 flex-shrink-0 ">
          {thumbnail_url ? (
            <Link href={`/`} target="_blank" rel="noopener noreferrer" className="relative z-10">
              {isVideo ? (
                <video src={thumbnail_url} className="w-full h-full rounded object-cover"/>
              ) : (
                <img src={thumbnail_url} alt="Thumbnail" className="w-full h-full rounded object-cover" />
              )}
            </Link>
          ) : (
            <div className="w-full h-full bg-gray-200 rounded" />
          )}
        </div>
        {/* Title, Time And Expnad Media*/}
        <div>
          <div>
            {title}
          </div>
          <div>
            {`posted by u/${username} ${timePassed}`}
          </div>
          {/* Expand Button */}
          <ExpandMedia post_type={post_type} media_url={thumbnail_url} text_content={text_content}/>
        </div>
      </div>
      <div className="mb-4 p-1 w-11/12 mx-4 lg:w-9/12 overflow-hidden bg-white rounded-b-lg">
        <PostActionButtons 
          post_id={post_id} subreddit_name={subreddit_name} 
          vote_type={vote_type} comments_count={comments_count}
          votes_count={votes_count} submitVote={submitPostVote}
        />
      </div>
      <CommentProviderContainer initialComments={comments} post_id={post_id}/>
    </div>
  )
};


export default PostView;

