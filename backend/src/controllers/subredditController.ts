import asyncHandler from "express-async-handler";
import { Request } from "express";
import { validationResult } from "express-validator";
import { deleteUploadedFile } from "../utils/deleteUploadedFile";
import CustomError from "../utils/customError";
import { 
  checkSubExist,
  createSub, 
  getSubInfo,
  subscribeUserToSub,
  unsubscribeUserToSub,
  getAllSubName
} from "../services/subredditServices";


const handleValidationErrors = (req: Request, location: string): void => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new CustomError("Validation Error", 400, {
      detail: errors.array(),
      location,
    });
  }
};

const postCreate = asyncHandler( async(req, res) => {
  const errors = validationResult(req);
  const { name, displayName, description } = req.body;
  const files = req.files as { [fieldname: string] : Express.Multer.File[] };
  const bannerFilePath =  files.banner?.[0]?.path;
  const logoFilePath =  files.logo?.[0]?.path;

  if (!errors.isEmpty()) {
    if (bannerFilePath) deleteUploadedFile(bannerFilePath);
    if (logoFilePath) deleteUploadedFile(logoFilePath);

    throw new CustomError("Validation Error", 400, {
      detail: errors.array(),
      location: "subController/postCreate "
    });
  }

  const result = await createSub({ name, displayName, description, bannerFilePath, logoFilePath });
  res.status(202).json({ success: true, message: result.message });
});

const getInfo = asyncHandler( async(req, res) => {
  handleValidationErrors(req, "subController/getInfo");
  
  const subName = req.params.name;
  const userId = req.user?.id;
  const result = await getSubInfo({ userId, subName })
  res.status(200).json({ success: true, subreddit_detail: result.data });
});

const postSubscribe = asyncHandler( async(req, res, next) => {
  handleValidationErrors(req, "subController/postSubscribe");

  const subId = req.body.subreddit_id;
  const userId = req.user?.id; 
  const result = await subscribeUserToSub({ userId, subId });
  res.status(200).json({ success: true,  message: result.message });
});

const postUnsubscribe = asyncHandler( async(req, res, next) => {
  handleValidationErrors(req, "subController/postUnsubscribe");

  const subId = req.body.subreddit_id;
  const userId = req.user?.id; 

  const result = await unsubscribeUserToSub({ userId, subId });
  res.status(200).json({ success: true, message: result.message });
});

const getAllName= asyncHandler( async(req, res) => {
  // const user_id = req.user?.id;
  const result = await getAllSubName();
  res.status(200).json({ success: true, communities: result.data });
});

const getSubExist = asyncHandler( async(req, res) => {
  handleValidationErrors(req, "subController/checkIfSubExist");
  
  const subName = req.query.sub_name as string;  
  const result = await checkSubExist(subName);
  res.status(200).json({ success: true, exist: result });
});

// const get_all_subreddit = asyncHandler( async(req, res) => {
//   query('offset')
//     .notEmpty()
//     .withMessage('Offset is required.')
//     .trim()
//     .isInt({ min: 0 })
//     .withMessage('Offset must be a positive integer.')
//     .escape()
//     .toInt(),
//   query('sort')
//     .optional()
//     .trim()
//     .isIn(['old', 'top', 'new'])
//     .withMessage('Only top and new sort by')
//     .escape(),

//   asyncHandler(async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       res.status(400).json({ errors: errors.array() });
//       return;
//     }

//     const { }

//     const user_id = req.user?.id || null;
//   })
// })
export default {
  postCreate,
  getInfo,
  postSubscribe,
  postUnsubscribe,
  getAllName,
  getSubExist
}
