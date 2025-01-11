import { SubProps } from "@/interface/SubProps";
import InfiniteFeed from "../InfiniteFeed";
import { PostItemProp } from "@/interface/PostProp";
import { getDate, getNumberAbbreviation } from "@/lib/utils";
import { fetchPostsBySub } from "@/lib/data_api";
import JoinAndCreateSub from "./JoinAndCreate";

interface SubViewProps {
  sub_detail: SubProps;
  sub_posts: PostItemProp[];
  hasMore: boolean;
}

const SubView = ({ sub_detail, sub_posts, hasMore }: SubViewProps) => {
  console.log(sub_detail);
  const { banner_url, description, logo_url, subreddit_id,
          sub_name, created_at, members_count, user_role } = sub_detail;
  const createdDate = getDate(created_at.toString());
  const banner = `http://localhost:5000/${banner_url}`;
  const logo = `http://localhost:5000/${logo_url}`;

  const membersCountWithAbv = getNumberAbbreviation(members_count);  
  return (
    <div >
      {/* Head Banner and Icon */}
      <div className="relative w-full mt-4">
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
          <div className="w-20 h-20 bg-white rounded-full border-4 border-white">
            {logo_url ? (
              <img src={logo} alt="Subreddit Logo" className="w-full h-full object-cover rounded-full" />
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
