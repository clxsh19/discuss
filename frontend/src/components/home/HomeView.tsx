import { PostItemProp } from "@/interface/PostProp";
import InfiniteFeed from "../InfiniteFeed";

interface HomeViewProps {
  posts: PostItemProp[],
  hasMore: boolean
}

const HomeView = ({ posts, hasMore }: HomeViewProps) => {
  return (
    <div className="w-4/5 flex h-full  mt-2 mx-auto p-2">
      {/* Home Feed */}
      <div className="w-4/6 ">
        <InfiniteFeed initialPosts={posts} initialHasMore={hasMore}/>
      </div>
      
      {/*  Create */}
      <div className="w-1/4 h-60 border border-gray-300 ml-auto hidden lg:block ">
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
