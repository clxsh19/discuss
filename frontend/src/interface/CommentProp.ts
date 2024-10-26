export interface CommentItemProp {
  post_id: number,
  comment_id: number,
  parent_id?: number,// maybe dont need remove later
  username: string,
  created_at: string,
  total_votes: number,
  vote_type: 1|-1|null,
  content: string,
}


export interface MapCommentProp extends CommentItemProp {
  children: MapCommentProp[],
}
 
