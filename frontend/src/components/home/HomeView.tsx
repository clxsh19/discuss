import { PostItemProp } from "@/interface/PostProp";
import InfiniteFeed from "../ui/InfiniteFeed";

interface HomeViewProps {
  posts: PostItemProp[],
  hasMore: boolean
}

const HomeView = ({ posts, hasMore }: HomeViewProps) => {
  return (
    <div className="mt-4 h-full flex">
      {/* Home Feed */}
      <InfiniteFeed initialPosts={posts} initialHasMore={hasMore}/>
      {/*  Create */}
      <div className="hidden lg:block border border-gray-300 bg-white w-3/12 h-60 ml-10 mr-4">
        <div>

        </div>
        <div className="">
          Create Post
        </div>
        <div>
          Create Community
        </div>
      </div>
  </div>
  );
};

export default HomeView;
