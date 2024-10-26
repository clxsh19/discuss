export interface SubProps {
  subreddit_id: number,
  sub_name: string,
  description: string,
  members_count: string,
  created_at: Date,
  user_role: string,
  link_banner_url ?: string,
  link_logo_url ?: string
}