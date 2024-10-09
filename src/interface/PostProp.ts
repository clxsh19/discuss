export interface PostItemProp {
  post_id: number,
  title: string,
  total_comments: number,
  total_votes: number,
  vote_type: 1|-1|null,
  created_at: string,
  username: string,
  subreddit_name: string,
  post_type: 'TEXT' | 'MEDIA' | 'LINK',
  link_url?: string,
  media_url?: string,
  link_img_url?: string | null,
};

export interface PostArray {
  posts: PostItemProp[] 
}



