import { PostItemProp } from "@/interface/PostProp";
import InfiniteFeed from "../InfiniteFeed";
import Link from 'next/link';

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
      <div className="w-1/4 ml-auto">
        <div className="p-4 rounded-md border border-neutral-400 text-white hidden lg:block">
          {/* Welcome Text */}
          <div className="text-base font-semibold mb-2">Welcome to Discuss!</div>
          <p className="text-sm text-neutral-200 leading-relaxed">
            A forum built for open discussions, fresh ideas, and community-driven conversations. 
            Start a thread or join one!
          </p>

          <div className="mt-4 space-y-2">
            {/* Create Post Button */}
            <Link
              href="/create_community"
              className="w-full block bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 rounded-md text-center"
            >
              Create Community
            </Link>
            {/* Create Community Button */}
            <Link
              href="/create_community"
              className="w-full block bg-green-600 hover:bg-green-700 text-white text-sm font-medium py-2 rounded-md text-center"
            >
              Explore Communities
            </Link>
          </div>
        </div>
      </div>

  </div>
  );
};

export default HomeView;
