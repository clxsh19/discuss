// import { useRouter } from 'next/router'
// import HeaderNav from "@/components/HeaderNav";
import { fetchSubData, fetchPostsBySub } from "@/lib/data_api";
import { buildPostWithMetaData } from "@/lib/utils";
import SubView from '@/components/subreddit/SubView';

interface SubPageProp {
  params: {
    sub_name: string,
  }
}

export default async function Page({ params } : SubPageProp) {
  const { sub_name } = params;
  const { posts, hasMore } = await fetchPostsBySub(sub_name, 0);
  const sub_detail = await fetchSubData(sub_name);
  const postWithLinkImg = await buildPostWithMetaData(posts);

  return (
    <>
      <SubView sub_posts={postWithLinkImg} sub_detail={sub_detail} hasMore={hasMore}/>
    </>
  )
}