import asyncHandler from "express-async-handler";
import handleValidationErrors from "../utils/handleValidationErrors";
import { 
  createComment,
  updateComment,
  deleteComment,
  getCommentsByPostId,
  userVoteComment
} from "../services/commentServices";

const postCreate = asyncHandler( async(req, res, next) => {
  handleValidationErrors(req, "commentController/postCreate");
  const { comment, post_id:postId } = req.body;
  const userId = req.user?.id;
  let parentId = req.body.parent_comment_id;
  
  if (parentId === "" ) parentId = null;

  const result = await createComment({ comment, userId, postId, parentId});
  res.status(202).json({
    success: true,
    comment_id: result.data
  });
});

const postUpdate = asyncHandler( async(req, res, next) => {
  handleValidationErrors(req, "commentController/postUpdate");
  const { comment, comment_id:commentId } = req.body;
  const userId = req.user?.id;

  const result = await updateComment({ userId, comment, commentId });
  res.status(200).json({ 
    success: true, 
    message: result.message 
  });
});

const postDelete = asyncHandler( async(req, res, next) => {
  handleValidationErrors(req, "commentController/postDelete")
  const commentId = req.body.comment_id;
  const userId = req.user?.id;  

  const result = await deleteComment({ commentId, userId });
  res.status(200).json({ 
    success: true, 
    message: result.message 
  });
});

const allowedSorts: Record<string, string> = {
  new: "ORDER BY p.created_at DESC, p.post_id DESC",
  top: "ORDER BY p.vote_count DESC, p.post_id DESC",
  hot: "ORDER BY p.hotness DESC, p.post_id DESC"
};

const getByPostId =  asyncHandler( async(req, res, next) => {
  handleValidationErrors(req, "commentController/getByPostId");
  const sort = req.query.sort || "new";
  const postId = Number(req.params.post_id);
  const userId = req.user?.id;

  const sortCondition = allowedSorts[sort as string];
  const result = await getCommentsByPostId({ postId, userId, sortCondition});
  res.status(200).json({ 
    success: true,
    comments: result.data,
  });
});

const postVote = asyncHandler(async (req, res, next) => {
  handleValidationErrors(req, "commentController/postVote");

  const { comment_id:commentId, vote_type:voteType} = req.body;
  const userId = req.user?.id;

  const result = await userVoteComment({ userId, commentId, voteType});
  res.status(202).json({
    success: true,
    message: result.message,
  });
});

export default {
  postCreate,
  postDelete,
  postUpdate,
  postVote,
  getByPostId
}

     
