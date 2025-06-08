import FeedContainer from "../feed/FeedContainer";
import LinkHref from "../ui/LinkHref";
import { HomeViewProps } from "@/interface/home/HomeViewProps";

const createLinkStyle = "w-full block text-white text-sm font-medium py-2 rounded-md text-center"

const HomeView = ({ posts, hasMore }: HomeViewProps) => {
  return (
    <div className="w-4/5 h-full flex p-2 mt-2 mx-auto ">
      {/* Home Feed */}
      <div className="w-4/6 ">
        <FeedContainer initialPosts={posts} initialHasMore={hasMore} />
      </div>

      {/*  Side bar */}
      <div className="w-1/4 ml-auto">
        <div className="p-4 rounded-md border border-neutral-400 text-white hidden lg:block">
          {/* Welcome Text */}
          <div className="text-base font-semibold mb-2">Welcome to Discuss!</div>
          <p className="text-sm text-neutral-200 leading-relaxed">
            A forum built for open discussions, fresh ideas, and community-driven conversations.
            Start a thread or join one!
          </p>

          {/* Create Links */}
          <div className="mt-4 space-y-2">
            <LinkHref
              href="/create_post"
              style={`${createLinkStyle} bg-blue-500 hover:bg-blue-600`}
            >
              {"Create Community"}
            </LinkHref>
            <LinkHref
              href="/create_community"
              style={`${createLinkStyle} bg-green-600 hover:bg-green-700`}
            >
              {"Explore Communities"}
            </LinkHref>
          </div>
        </div>
      </div>

    </div>
  );
};

export default HomeView;
