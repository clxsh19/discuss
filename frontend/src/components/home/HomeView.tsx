import { PostItemProp } from "@/interface/PostProp";
import InfiniteFeed from "../InfiniteFeed";

interface HomeViewProps {
  posts: PostItemProp[],
  hasMore: boolean
}

const HomeView = ({ posts, hasMore }: HomeViewProps) => {
  return (
    <div className="w-4/5 h-full flex p-2 mt-2 mx-auto ">
      {/* Home Feed */}
      <div className="w-4/6 ">
        <InfiniteFeed initialPosts={posts} initialHasMore={hasMore}/>
      </div>
      
      {/*  Create */}
      <div className="w-1/4 h-60 ml-auto border border-gray-300 hidden lg:block ">
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
