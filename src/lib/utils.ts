import {PostItemProp} from "@/interface/PostProp";
import { CommentItemProp, MapCommentProp } from "@/interface/CommentProp";
import { fetchUrlMetaData } from "./data_api";
import { Comment } from "postcss";

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
      return `${years} year${years > 1 ? 's' : ''}`;
    case days > 0:
      return `${days} day${days > 1 ? 's' : ''}`;
    case hours > 0:
      return `${hours} hour${hours > 1 ? 's' : ''}`;
    case minutes > 0:
      return `${minutes} minute${minutes > 1 ? 's' : ''}`;
    default:
      return `${seconds} second${seconds !== 1 ? 's' : ''}`;
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

export const buildCommentTree = (comments: CommentItemProp[]) => {
  let commentMap = new Map<number, MapCommentProp>();
  let roots: MapCommentProp[] = [];

  comments.forEach(comment => {
    commentMap.set(comment.comment_id, { ...comment, children: [] });
  });

  comments.forEach(comment => {
    const mapComment = commentMap.get(comment.comment_id)!;
    if (comment.parent_id) {
      const parent = commentMap.get(comment.parent_id);
      if (parent) {
        parent.children.push(mapComment);
      }
    } else {
        roots.push(mapComment);
    }
  });
  return roots;
}

export const buildPostWithMetaData = async(posts: PostItemProp[]) => {
  if ( typeof posts === 'undefined' || posts.length === 0) {
    return [];
  }
  const postWithLinkImg = await Promise.all(
    posts.map(async (post: PostItemProp) => {
      if (post.link_url) {
        const link_img_url = await fetchUrlMetaData(post.link_url);
        post.link_img_url = link_img_url;
      }
      return post; 
    })
  );
  return postWithLinkImg;
}