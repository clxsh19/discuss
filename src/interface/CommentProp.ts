export interface CommentItemProp {
  comment_id: number,
  parent_id?: number,// maybe dont need remove later
  username: string,
  created_at: string,
  total_votes: string,
  content: string,
}


export interface MapCommentProp extends CommentItemProp {
  children: MapCommentProp[],
}
 