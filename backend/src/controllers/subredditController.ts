import asyncHandler from 'express-async-handler';
import { validationResult } from 'express-validator';
import deleteFromCloudinary from '../utils/deleteFromCloudinary';
import CustomError from '../utils/customError';
import handleValidationErrors from '../utils/handleValidationErrors';
import {
  checkSubExist,
  createSub,
  getSubInfo,
  subscribeUserToSub,
  unsubscribeUserToSub,
  getAllSubName,
  getByTag,
} from '../services/subredditServices';
import { Request, Response } from 'express';

const postCreate = asyncHandler(async (req: Request, res: Response) => {
  const errors = validationResult(req);
  const {
    sub_name: subName,
    display_name: displayName,
    description,
    tags,
  } = req.body;
  const files = req.files as { [fieldname: string]: Express.Multer.File[] };
  // Get Cloudinary URLs
  const bannerUrl = files.banner?.[0]?.cloudinary?.secure_url;
  const logoUrl = files.logo?.[0]?.cloudinary?.secure_url;

  if (!errors.isEmpty()) {
    if (files.banner?.[0]?.cloudinary?.public_id) {
      await deleteFromCloudinary(files.banner[0].cloudinary.public_id);
    }
    if (files.logo?.[0]?.cloudinary?.public_id) {
      await deleteFromCloudinary(files.logo[0].cloudinary.public_id);
    }

    throw new CustomError('Validation Error', 400, {
      errors: errors.array(),
      location: 'subController/postCreate ',
    });
  }

  const result = await createSub({
    subName,
    displayName,
    description,
    bannerUrl,
    logoUrl,
    tags,
  });
  res.status(202).json({ success: true, message: result.message });
});

const getInfo = asyncHandler(async (req: Request, res: Response) => {
  handleValidationErrors(req, 'subController/getInfo');

  const subName = req.params.sub_name;
  const userId = req.user?.id;
  const result = await getSubInfo({ userId, subName });
  res.status(200).json({ success: true, subreddit_detail: result.data });
});

const postSubscribe = asyncHandler(async (req: Request, res: Response) => {
  handleValidationErrors(req, 'subController/postSubscribe');

  const subId = req.body.sub_id;
  const userId = req.user?.id;
  const result = await subscribeUserToSub({ userId, subId });
  res.status(200).json({ success: true, message: result.message });
});

const postUnsubscribe = asyncHandler(async (req: Request, res: Response) => {
  handleValidationErrors(req, 'subController/postUnsubscribe');

  const subId = req.body.sub_id;
  const userId = req.user?.id;
  const result = await unsubscribeUserToSub({ userId, subId });
  res.status(200).json({ success: true, message: result.message });
});

const getAllName = asyncHandler(async (req: Request, res: Response) => {
  // const user_id = req.user?.id;
  const result = await getAllSubName();
  res.status(200).json({ success: true, communities: result.data });
});

const getSubExist = asyncHandler(async (req: Request, res: Response) => {
  handleValidationErrors(req, 'subController/getSubExist');

  const subName = req.query.sub_name as string;
  const result = await checkSubExist(subName);
  res.status(200).json({ success: true, exist: result });
});

const getSubsByTag = asyncHandler(async (req: Request, res: Response) => {
  handleValidationErrors(req, 'subController/getSubsByTag');

  const offset = Number(req.query.offset) || 0;
  const tag = req.query.tag as string;
  // console.log(tag);
  const result = await getByTag({ tag, offset });
  res.status(200).json({
    success: true,
    hasMore: result.hasMore,
    communities: result.subs,
  });
});

export default {
  postCreate,
  getInfo,
  postSubscribe,
  postUnsubscribe,
  getAllName,
  getSubExist,
  getSubsByTag,
};
