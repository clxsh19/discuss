import SideBarContainer from "@/components/SidebarContainer";
import { fetchSubData } from "@/lib/data_api";
import { getNumberAbbreviation, getDate } from "@/lib/utils";
import { notFound } from "next/navigation";

export default async function SubLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { sub_name: string };
}) {
  const subData = await fetchSubData(params.sub_name);
  if (!subData) {
    notFound();
  }
  const { 
    description, subreddit_id, sub_name, display_name, 
    created_at, members_count, user_role 
  } = subData;
  const createdDate = getDate(created_at.toString());
  const membersCountWithAbv = getNumberAbbreviation(members_count);
  return (
    <div className="w-4/5 flex p-2 mt-2 mx-auto">
      {/* Main container */}
      <div className="w-4/6 mt-4">{children}</div>

      {/* Side Container */}
      <SideBarContainer 
        display_name={display_name} sub_name={sub_name}
        membersCountWithAbv={membersCountWithAbv}
        createdDate={createdDate}
        subreddit_id={subreddit_id}
        user_role={user_role}
        description={description}
      />
    </div>
  );
}
