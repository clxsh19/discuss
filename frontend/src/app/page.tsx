import { fetchAllPosts } from "@/lib/data_api";
import { buildPostWithMetaData } from "@/lib/utils";
import HomeView from "@/components/home/HomeView";

export default async function Page() {
  const { posts, hasMore } = await fetchAllPosts(0);
  const postWithLinkImg = await buildPostWithMetaData(posts);

  return (
    <HomeView posts={postWithLinkImg} hasMore={hasMore} />
  )
}


