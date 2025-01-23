import CreatePost from "@/components/post/create_post/CreatePost";
import { checkIfCommunityExist } from "@/lib/data_api";
import { notFound } from "next/navigation";

interface CreatePostProp {
  searchParams: {
    sub_name?: string
  }
}

export default async function Page({ searchParams } : CreatePostProp) {
  const { sub_name } = searchParams;
  const validSubNameRegex = /^[a-zA-Z0-9_]+$/;

  if (sub_name) {
    if (!validSubNameRegex.test(sub_name.trim())) {
      throw new Error("Invalid community name. Only letters, numbers, and underscores are allowed.");
    }
    const communityExist = await checkIfCommunityExist(sub_name);
  
    if (communityExist <= 0 && sub_name !== undefined) {
      notFound();
    }
  }

  return (
    <CreatePost sub_name={sub_name} />
  )
}
