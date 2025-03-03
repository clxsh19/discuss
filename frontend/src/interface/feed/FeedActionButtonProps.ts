export interface FeedActionButtonsProps {
  post_type: "TEXT" | "MEDIA" | "LINK",
  sub_name: string,
  post_id: number,
  comments_count: number,
  media_url?: string | null,
  isVideo?: RegExpMatchArray | null,
  text_content: string,
}
