import { fetchAllPosts } from "@/lib/data_api";
import InfinitePostFeed from "@/components/post/post_feed/InfinitePostFeed";
import InfiniteFeed from "@/components/ui/InfiniteFeed";
import { buildPostWithMetaData } from "@/lib/utils";
// import Status from "@/components/auth/Status";

export default async function Page() {
  const { posts, hasMore } = await fetchAllPosts(0);
  const postWithLinkImg = await buildPostWithMetaData(posts);
  
  return (
    // <InfinitePostFeed initialPosts={postWithLinkImg} initialHasMore={hasMore}/>
    <InfiniteFeed initialPosts={postWithLinkImg} initialHasMore={hasMore}/>
  )
}