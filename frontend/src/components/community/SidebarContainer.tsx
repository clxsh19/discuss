import JoinAndCreateSub from "./JoinAndCreateSub"

interface SideBarContainerProps {
  display_name: string,
  sub_name: string,
  membersCountWithAbv: string,
  createdDate: string,
  subreddit_id: number,
  user_role: string,
  description: string,
}

const SideBarContainer = ( props : SideBarContainerProps) => {
  const { display_name, sub_name, membersCountWithAbv, createdDate, 
          subreddit_id, user_role, description } = props;
  return (
    <div className="w-1/4 ml-auto hidden lg:block">
        <div className="p-3 rounded-md border border-neutral-400">
          {/* Subreddit Name */}
          <h2 className="text-xl font-semibold text-green-300">{display_name}</h2>
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
          <div className="mt-4">
            <JoinAndCreateSub sub_name={sub_name} subreddit_id={subreddit_id} user_role={user_role} />
          </div>
        </div>
        <div className="mt-2 p-3 rounded-md border border-neutral-400">
          <pre className="text-sm text-neutral-200 whitespace-pre-wrap break-words leading-relaxed overflow-hidden">
            {description}
          </pre>
        </div>
      </div>
  )
}

export default SideBarContainer;
