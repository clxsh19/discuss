export interface SubProps {
  subreddit_id: number,
  sub_name: string,
  description: string,
  members_count: string,
  created_at: Date,
  user_role: string,
  banner_url ?: string,
  logo_url ?: string
}