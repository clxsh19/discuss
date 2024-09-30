import { fetchAllPosts } from "@/lib/data_api";
import InfiniteScroll from "@/components/post/post_feed/InfinitePostFeed";
import { buildPostWithMetaData } from "@/lib/utils";
// import Status from "@/components/auth/Status";

export default async function Page() {
  const { posts } = await fetchAllPosts(0);
  const postWithLinkImg = await buildPostWithMetaData(posts);
  console.log('fetched intial posts');
  
  return (
    <InfiniteScroll initialPosts={postWithLinkImg}/>
  )
}