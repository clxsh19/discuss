import {PostItemProp} from "@/interface/PostProp";
import { CommentItemProp } from "@/interface/CommentProp";
import { fetchUrlMetaData } from "./data_api";
import { fileTypeFromBuffer } from "file-type";


export const validateFile = async (file: File, max_size: number, allowed_types: string[]) => {
  if (file.size > max_size) {
    return {
      valid: false,
      message: 'File size exceeds the 10MB limit.'
    }
  }

  const buffer = await file.arrayBuffer();
  const fileType = await fileTypeFromBuffer(new Uint8Array(buffer));

  if (!fileType || !allowed_types.includes(fileType.mime)) {
    return {
      valid: false,
      message: 'Invalid file type. Only images and videos are allowed.'
    }
  }

  return {
    valid: true,
    message : "valid file"
  };
}

export const getNumberAbbreviation = (member_count: string): string => {
  const memberCount = parseInt(member_count, 10);
  let abbreviatedCount = memberCount;
  let abbreviation = "";

  if (memberCount >= 1000000) {
    abbreviatedCount =memberCount / 1000000;
    abbreviation = "M";
  } else if (memberCount >= 1000) {
    abbreviatedCount = memberCount / 1000;
    abbreviation = "K";
  }
  return abbreviatedCount.toFixed(1).replace(/\.0$/, "") + abbreviation;
};


export const getTimePassed = (dateStr:string): string => {
  const currentDate = new Date();
  const providedDate = new Date(dateStr);
  const timeDifference = currentDate.getTime() - providedDate.getTime();

  const seconds = Math.floor(timeDifference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const years = Math.floor(days / 365);

  switch (true) {
    case years > 0:
      return `${years} year${years > 1 ? 's' : ''} ago`;
    case days > 0:
      return `${days} day${days > 1 ? 's' : ''} ago`;
    case hours > 0:
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    case minutes > 0:
      return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    default:
      return '1 minute ago';
      // return `${seconds} second${seconds !== 1 ? 's' : ''}`;
  }
}

export const getDate = (dateStr:string): string => {
  const date = new Date(dateStr);
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul",
         "Aug", "Sep", "Oct", "Nov", "Dec"];

  const namedMonth = months[date.getMonth()];
  const namedYear = date.getFullYear();
  const dateOfMonth = date.getDate();

  return `${namedMonth} ${dateOfMonth}, ${namedYear}`;
}

export const buildCommentTree = (flatComments: CommentItemProp[]): CommentItemProp[] => {
  const commentMap: Record<number, CommentItemProp> = {};
  const tree: CommentItemProp[] = [];

  // Create a map with children initialized
  for (const comment of flatComments) {
    comment.children = [];
    // comment.created_at client side sort maybe
    commentMap[comment.comment_id] = comment;
  }

  // Build the tree structure
  for (const comment of flatComments) {
    // if (!comment.parent_id) {
    //   tree.push(comment); // Root comments go to the tree
    // } else if (commentMap[comment.parent_id]) {
    //   commentMap[comment.parent_id].children!.push(comment); // Use non-null assertion for safe push
    // }
    if (comment.parent_id) {
      const parent = commentMap[comment.parent_id];
      if (parent) {
        parent.children?.push(comment);
      }
    } else {
      if (!comment.deleted || comment.children!.length > 0) {
        tree.push(comment)
      }
    }
  }

  return tree;
};

export const buildPostWithMetaData = async (posts: PostItemProp[] | PostItemProp) => {
  if (typeof posts === 'undefined') {
    return [];
  }

  const postsArray = Array.isArray(posts) ? posts : [posts];

  const postWithLinkImg = await Promise.all(
    postsArray.map(async (post: PostItemProp) => {
      if (post.link_url) {
        const link_img_url = await fetchUrlMetaData(post.link_url);
        post.link_img_url = link_img_url;
      }
      return post;
    })
  );

  return postWithLinkImg;
};












