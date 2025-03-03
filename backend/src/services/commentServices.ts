import { query, queryTransaction } from "../db";
import CustomError from "../utils/customError";

interface createCommentParams {
  comment: string;
  userId?: number;
  postId: number;
  parentId: number;
}

interface alterCommentParams {
  userId?: number; 
  commentId: number;
}

interface updateCommentParams extends alterCommentParams {
  comment: string;
}

interface getCommentsByPostIdParmas {
  userId?: number;
  postId: number;
  sortCondition: string;
}

interface UserVoteCommentParams {
  commentId: string;
  voteType: number;
  userId?: number;
}

const createComment = async({ comment, userId, postId, parentId } : createCommentParams) => {
  const queries = [
    'INSERT INTO comments (content, user_id, post_id, parent_comment_id) VALUES ($1, $2, $3, $4) RETURNING comment_id',
    'UPDATE posts SET comment_count = comment_count + 1 WHERE post_id = $1'
  ];
  const params = [
    [comment, userId, postId, parentId],
    [postId]
  ]
  
  const result = await queryTransaction(queries, params);
  const commentId = result[0].rows[0].comment_id;
  return { data: commentId }
}

const getUserId = async(commentId: number) => {
  const { rows } = await query(`SELECT user_id FROM comments 
    WHERE comment_id = $1`, [commentId]);
  return rows[0]?.user_id;
}

const updateComment = async({ userId, comment, commentId } : updateCommentParams) => {
  const fetchedUserId = await getUserId(commentId);
  
  if (!fetchedUserId) {
    throw new CustomError("Comment doesn't exists", 403, {
      errors: "the comment exists query returns false",
      location: "commentController/postUpdate/updateComment"
    });
  };

  if (fetchedUserId !== userId) {
    throw new CustomError("Unauthorized user cannot update comment", 403, {
      errors: "the fetched user id !== the given user id",
      location: "commentController/postUpdate/updateComment"
    });
  }

  await query(`UPDATE comments SET content = $1 WHERE comment_id = $2`, [comment, commentId]);
  
  return { message: "Comment updated successfully" };
}

const deleteComment = async({ commentId, userId } : alterCommentParams) => {
  const fetchedUserId = await getUserId(commentId);
  
  if (!fetchedUserId) {
    throw new CustomError("Comment doesn't exists", 403, {
      errors: "the comment exists query returns false",
      location: "commentController/postUpdate/deleteComment"
    });
  };

  if (fetchedUserId !== userId) {
    throw new CustomError("Unauthorized user cannot update comment", 403, {
      errors: "the fetched user id !== the given user id",
      location: "commentController/postUpdate/deleteComment"
    });
  };
  
  //the deleted user id is -1 for all deleted comments
  await query(`UPDATE comments SET user_id = -1, content = '', deleted = TRUE
    WHERE comment_id = $1`, [commentId]
  );

  return { message: "Comment deleted successfully" };
}

const getCommentsByPostId = async({ postId, userId, sortCondition }: getCommentsByPostIdParmas) => {
  const getCommentsQuery = await query(`SELECT
      c.comment_id,
      c.content,
      c.user_id,
      c.parent_comment_id AS parent_id,
      c.created_at,
      u.username,
      c.vote_count AS total_votes,
      cv.vote_type,
      c.deleted
    FROM comments c
    LEFT JOIN users u ON c.user_id = u.user_id
    LEFT JOIN (
      SELECT DISTINCT ON (comment_id) comment_id, vote_type 
      FROM comment_votes 
      WHERE user_id = $1
    ) cv ON c.comment_id = cv.comment_id
    WHERE c.post_id = $2
    ORDER BY 
      CASE WHEN c.parent_comment_id IS NULL THEN 0 ELSE 1 END, 
      ${sortCondition}`, // Use validated column, not user input
    [userId, postId]);
  return ({ data: getCommentsQuery.rows }); 
}

const userVoteComment = async({ userId, commentId, voteType } : UserVoteCommentParams) => {
  const voteCountQuery = 'UPDATE comments SET vote_count = vote_count + $1 WHERE comment_id = $2';
  let voteQuery: string;
  let voteQueryParams: any[];
  let voteDiff = voteType; // how much to add or subtract

  const existingVote = await query(`SELECT vote_type FROM comment_votes
     WHERE user_id=$1 AND comment_id = $2`, [userId, commentId]);

  if (existingVote.rows.length > 0) { // vote exist
    const oldVoteType = existingVote.rows[0].vote_type;
    if (oldVoteType === voteType) {
      // same as old vote, so delete it
      voteQuery = 'DELETE FROM comment_votes WHERE user_id = $1 AND comment_id = $2';
      voteQueryParams = [userId, commentId];
      voteDiff = -voteType;
    } else { 
      // update the vote with new vote
      voteQuery = 'UPDATE comment_votes SET vote_type = $1 WHERE user_id = $2 AND comment_id = $3';
      voteQueryParams = [voteType, userId, commentId];
      voteDiff = voteType * 2;
    }
  } else { 
    // vote doesn't exist so insert it
    voteQuery = 'INSERT INTO comment_votes (user_id, post_id, vote_type) VALUES ($1, $2, $3)';
    voteQueryParams = [userId, commentId, voteType];
  }

  await queryTransaction(
    [voteQuery, voteCountQuery], [ 
    voteQueryParams, [voteDiff, commentId]
  ]);
  
    return { message: "Vote registered successfully"}
}

export {
  createComment,
  updateComment,
  deleteComment,
  getCommentsByPostId,
  userVoteComment
}
