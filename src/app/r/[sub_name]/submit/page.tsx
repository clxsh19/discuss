import CreatePost from "@/components/post/create_post/CreatePost";

interface PageProps {
  params: {
    sub_name: string;
  };
}

export default function Page({ params }: PageProps) {
  const { sub_name } = params;
  return (
    <div>
      <CreatePost sub_name={sub_name} />
    </div>
  );
}
