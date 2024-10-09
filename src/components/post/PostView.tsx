import { PostItemProp } from "@/interface/PostProp";
import { MapCommentProp } from "@/interface/CommentProp";
import { getTimePassed } from '@/lib/utils';
// import { UpvoteIcon, DownvoteIcon, CommentIcon, ShareIcon, CircleIcon } from "../icons";
import { UpvoteIcon, DownvoteIcon, CommentIcon, ShareIcon, CircleIcon } from "../Icons";
import CommentTree from "../comment/CommentTree";
import CommentForm from "../comment/CommentForm";

export interface PostViewProp extends PostItemProp {
  text_content: string,
  comments: MapCommentProp[]
}

const PostView = (props : PostViewProp) => {
  const { 
    subreddit_name, post_id, username, created_at, total_comments,
    title, total_votes, vote_type, comments, text_content
  } = props;
  const timePassed = getTimePassed(created_at);
  const votes_count = (total_votes == null) ? 0 : total_votes;
  const comments_count = (total_comments == null) ? 0 : total_comments;
  return (

    <div>
      <div> 
        <div className='flex justify-between text-12 pt-md pb-2xs px-md relative xs:px-0'>
          <div className='flex gap-xs items-center pr-xs truncate'>
            <div className='avatar text-32 items-center overflow-hidden flex-shrink-0 indent-0 w-xl h-xl'>
              <CircleIcon />
            </div>
            <div className='flex gap-0 flex-col truncate'>
              <div className='flex flex-none items-center flex-row gap-2xs flex-nowrap'>
                <div className='flex flex-none subreddit-name neutral-content font-bold text-12 whitespace-nowrap'>
                  r/{subreddit_name}
                </div>
                <div className="flex items-center w-2xs text-neutral-content-weak font-normal text-12">
                  .
                </div>
                <time>
                  {timePassed}
                </time>
              </div>
              <div className="flex flex-none flex-row gap-2xs items-center flex-nowrap">
                <div className="flex flex-none flex-row gap-2xs items-center flex-nowrap">
                  {username}
                </div>
              </div>
            </div>
          </div>
        </div>
        <h1 className="font-semibold text-neutral-content-strong m-0 text-18 xs:text-24  mb-xs px-md xs:px-0 xs:mb-md ">
          {title}
        </h1>
        <div className="mb-sm  mb-xs px-md xs:px-0">
          <pre className="md text-14">{text_content}</pre>
        </div>
      </div>
      <div className="flex gap-sm flex-row items-center flex-nowrap overflow-hidden justify-start h-2xl mt-md px-md xs:px-0">
      <div className="flex flex-row m-2 font-[400]">
        <div className="flex flex-row p-2 mr-2 bg-slate-200 rounded-2xl">
          <button className="mr-2">
            <UpvoteIcon />
          </button>
          <div className="mr-2 text-xs font-[600]">{votes_count}</div>
          <button>
            <DownvoteIcon />
          </button>
        </div>
        <div className="flex flex-row p-2 mr-2 bg-slate-200 rounded-2xl">
          <button className="mr-2">
            <CommentIcon />
          </button>
          <div className="mr-2 text-xs font-[600]">{comments_count}</div>
        </div>
        <div className="flex flex-row p-2 mr-2 bg-slate-200 rounded-2xl">
          <button className="mr-2">
            <ShareIcon />
          </button>
          <div className="mr-2 text-xs font-[600]">Share</div>
        </div>
      </div>
      </div>
      <CommentForm post_id={post_id}/>
      <CommentTree post_id={post_id} commentTree={comments} />
    </div>
  )
};


export default PostView;

