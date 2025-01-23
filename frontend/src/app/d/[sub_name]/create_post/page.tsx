import CreatePost from "@/components/post/create_post/CreatePost";

interface CreatePostProp {
  params: {
    sub_name: string
  }
}

export default async function Page({ params } : CreatePostProp) {
  const { sub_name } = params;
  return (
    <CreatePost sub_name={sub_name} />
  )
}
