export interface CommentItemProp {
  user_id: number,
  comment_id: number,
  parent_id?: number,// maybe dont need remove later
  username: string,
  created_at: string,
  total_votes: number,
  vote_type: 1|-1|null,
  content: string,
  children?: CommentItemProp[],
  deleted: boolean
}


// export interface MapCommentProp extends CommentItemProp {
//   children_id: number[]
// }
 
// export interface NestedCommentProp extends CommentItemProp {
//   children: NestedCommentProp[]
// }

