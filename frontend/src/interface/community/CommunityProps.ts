import { SubProps } from "../SubProps";
import { PostItemProp } from "../PostProps";
import CommunityJoinLeaveButton from "@/components/community/CommunityJoinLeaveButton";

export interface CommunityViewProps {
  sub_detail: SubProps;
  sub_posts: PostItemProp[];
  hasMore: boolean;
}

export interface CommunitySidebarProps {
  display_name: string;
  sub_name: string;
  membersCountWithAbv: string;
  createdDate: string;
  subreddit_id: number;
  user_role: string;
  description: string;
}

export interface CommunityJoinLeaveButtonProps {
  subreddit_id: number;
  user_role: string
}
