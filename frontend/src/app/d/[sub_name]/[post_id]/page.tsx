import { fetchPostDetail, fetchPostComments } from "@/lib/data_api";
import PostView from "@/components/post/PostView";
import { buildCommentTree } from '@/lib/utils';
import { buildPostWithMetaData } from "@/lib/utils";

interface PostPageProp {
  params: {
    post_id: number,
    sub_name: string
  }
}

export default async function Page({ params } : PostPageProp) {
  const { post_id, sub_name } = params;
  // fetch with 0 offset for inital comments
  const post = await fetchPostDetail(post_id);
  //fetch intial commets only
  const comments = await fetchPostComments(post_id, 0);
  const postWithLinkImg = await buildPostWithMetaData(post);


  //include the sub name from url
  post.subreddit_name = sub_name;
  post.post_id = post_id;
  
  return (
    <PostView post={postWithLinkImg} comments={comments} />
  )
}
