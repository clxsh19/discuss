import { SubProps } from "@/interface/SubProps";
import InfiniteFeed from "../InfiniteFeed";
import { PostItemProp } from "@/interface/PostProp";
import { getDate, getNumberAbbreviation } from "@/lib/utils";
import JoinAndCreateSub from "./JoinAndCreate";

interface SubViewProps {
  sub_detail: SubProps;
  sub_posts: PostItemProp[];
  hasMore: boolean;
}

const SubView = ({ sub_detail, sub_posts, hasMore }: SubViewProps) => {
  const { banner_url, description, logo_url, subreddit_id,
          sub_name, created_at, members_count, user_role } = sub_detail;
  const createdDate = getDate(created_at.toString());
  const membersCountWithAbv = getNumberAbbreviation(members_count);
  const banner = `http://localhost:5000/${banner_url}`;
  const logo = `http://localhost:5000/${logo_url}`;
    
  return (
    <div className="w-4/5 flex p-2 mt-2 mx-auto">
      {/* Head Banner and Icon */}
      <div className="w-4/6 mt-4">
        {/* Banner */}
        <div className="w-full h-40 ">
          {banner_url ? (
            <img src={banner} alt="Subreddit Banner" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-gray-200" />
          )}
        </div>

        {/* Logo and Sub Name */}
        <div className="relative transform -translate-y-1/3 flex items-center space-x-4 px-4">
          <div className="w-20 h-20 bg-white rounded-full border border-white">
            {logo_url ? (
              <img src={logo} alt="Community Logo" className="w-full h-full object-cover rounded-full" />
            ) : (
              <div className="w-full h-full bg-gray-300 rounded-full" />
            )}
          </div>
          <div className="text-2xl pt-8 font-bold">
            r/{sub_name}
          </div>
        </div>

        {/* Sub Feed */}
        <InfiniteFeed sub_name={sub_name} initialPosts={sub_posts} initialHasMore={hasMore}/>
      </div>

      {/* Sub Main Container */}
      <div className="w-1/4 h-60 ml-auto p-4 rounded-lg border border-gray-600 hidden lg:block ">
       {/* Sub detail */}
       <div className="text-white">
          <span className="text-green-200 text-lg font-serif">{sub_name}</span>
          <JoinAndCreateSub sub_name={sub_name} subreddit_id={subreddit_id} user_role={user_role}/>
       </div>
      </div>
    </div>
  );
};

export default SubView;
