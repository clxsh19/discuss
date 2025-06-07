import CommunityJoinLeaveButton from "./CommunityJoinLeaveButton";
import { CommunitySidebarProps } from "@/interface/community/CommunityProps";
import LinkHref from "../ui/LinkHref";

const CommunitySidebar = ({
  display_name, sub_name,
  membersCountWithAbv, createdDate,
  subreddit_id, user_role, description
}: CommunitySidebarProps) => {
  return (
    <div className="w-1/4 ml-auto hidden lg:block">
      <div className="p-3 rounded-md border border-neutral-400">
        {/* Subreddit Name */}
        <LinkHref
          href={`/d/${sub_name}`}
          children={display_name}
          style="text-xl font-semibold text-green-300"
        />
        <p className="text-sm text-neutral-300">d/{sub_name}</p>

        {/* Subreddit Stats */}
        <div className="mt-3  border-t border-gray-600 pt-3">
          <div className="space-x-2">
            <span className="text-neutral-300">Members:</span>
            <span className="text-white font-medium">{membersCountWithAbv}</span>
          </div>
          <div className="space-x-2">
            <span className="text-gray-300">Created:</span>
            <span className="text-white font-medium">{createdDate}</span>
          </div>
        </div>

        {/* Join/Create Actions */}
        <div className="mt-4 flex flex-col space-y-3 text-lg text-white font-serif">
          {/* Create Post Button */}
          <LinkHref
            href={`/create_post?sub_name=${sub_name}`}
            children="Create Post"
            style="p-1 bg-green-600 rounded-md hover:bg-green-700 text-center transition"
          />
          <CommunityJoinLeaveButton subreddit_id={subreddit_id} user_role={user_role} />
        </div>
      </div>

      {/* Community Description */}
      <div className="mt-2 p-3 rounded-md border border-neutral-400">
        <pre className="text-sm text-neutral-200 whitespace-pre-wrap break-words leading-relaxed overflow-hidden">
          {description}
        </pre>
      </div>
    </div>
  )
}

export default CommunitySidebar;
