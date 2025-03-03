import { fetchSubData, fetchPostsBySub } from "@/lib/data_api";
import { buildPostWithMetaData } from "@/lib/utils";
import SubView from '@/components/community/SubView';
import { notFound } from "next/navigation";

interface SubPageProp {
  params: {
    sub_name: string,
  }
}

export default async function Page({ params } : SubPageProp) {
  const { sub_name } = params;
  const subData = await fetchSubData(sub_name);
  if (!subData) {
    notFound();
  }
  const { posts, hasMore } = await fetchPostsBySub(sub_name, 0);
  const postWithLinkImg = await buildPostWithMetaData(posts);

  return (
    <>
      <SubView sub_posts={postWithLinkImg} sub_detail={subData} hasMore={hasMore}/>
    </>
  )
}
