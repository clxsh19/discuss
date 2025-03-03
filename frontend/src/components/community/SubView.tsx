import { SubProps } from "@/interface/SubProps";
import FeedContainer from "../feed/FeedContainer";
import { PostItemProp } from "@/interface/PostProps";

interface SubViewProps {
  sub_detail: SubProps;
  sub_posts: PostItemProp[];
  hasMore: boolean;
}

const SubView = ({ sub_detail, sub_posts, hasMore }: SubViewProps) => {
  const { banner_url, logo_url, sub_name, display_name } = sub_detail;
  const banner = `${process.env.MEDIA_API_URL}/${banner_url}`;
  const logo = `${process.env.MEDIA_API_URL}/${logo_url}`;
    
  return (
    <>
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
        <div className="mt-6 text-2xl text-white font-bold">
          {display_name}
        </div>
      </div>

      {/* Sub Feed */}
      <FeedContainer subName={sub_name} initialPosts={sub_posts} initialHasMore={hasMore}/>
    </>
  );
};

export default SubView;
