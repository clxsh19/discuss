import { SubProps } from "@/interface/SubProps";
import { PostItemProp } from "@/interface/PostProp";
import InfiniteSubFeed from "./InfiniteSubFeed";
import InfiniteFeed from "../ui/InfiniteFeed";
import { getDate, getNumberAbbreviation } from "@/lib/utils";
import { fetchPostsBySub } from "@/lib/data_api";
import JoinAndCreateSub from "./JoinAndCreate";

interface SubViewProps {
  sub_detail: SubProps;
  sub_posts: PostItemProp[];
  hasMore: boolean;
}

const SubView = ({ sub_detail, sub_posts, hasMore }: SubViewProps) => {
  const { link_banner_url, description, link_logo_url, subreddit_id,
          sub_name, created_at, members_count, user_role } = sub_detail;
  const createdDate = getDate(created_at.toString());
  const membersCountWithAbv = getNumberAbbreviation(members_count);
  
  return (
    <div >
      {/* Head Banner and Icon */}
      <div className="relative w-full mt-4">
        {/* Banner */}
        <div className="w-full h-40 ">
          {link_banner_url ? (
            <img src={link_banner_url} alt="Subreddit Banner" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-gray-200" />
          )}
        </div>

        {/* Logo and Sub Name */}
        <div className="relative transform -translate-y-1/3 flex items-center space-x-4 px-4">
          <div className="w-20 h-20 bg-white rounded-full border-4 border-white">
            {link_logo_url ? (
              <img src={link_logo_url} alt="Subreddit Logo" className="w-full h-full object-cover rounded-full" />
            ) : (
              <div className="w-full h-full bg-gray-300 rounded-full" />
            )}
          </div>
          <div className="text-2xl pt-8 font-bold">
            r/{sub_name}
          </div>
        </div>
      </div>

      {/* Sub Main Container */}
      <div className="-mt-2 flex">
        {/* Sub Feed */}
        <InfiniteFeed sub_name={sub_name} initialPosts={sub_posts} initialHasMore={hasMore}/>
        {/* Sub detail */}
        <div className="hidden lg:block lg:w-3/12 lg:ml-10 lg:mr-4">
          <div className="p-4 rounded-lg border border-gray-300">
            <div className="text-[14px] font-bold">
              {sub_name}
            </div>
            <div className="mt-2 text-[14px] text-gray-600 break-words overflow-wrap">
              {description ? description : "No description available."}
            </div>
            <div className="font-bold text-[14px] text-gray-800">
              Created {createdDate}
            </div>
            <div className="font-bold text-[14px] text-gray-800">
              {membersCountWithAbv} Members
            </div>
          </div>
          <JoinAndCreateSub sub_name={sub_name} subreddit_id={subreddit_id} user_role={user_role}/>
        </div>
      </div>
    </div>
  );
};

export default SubView;
