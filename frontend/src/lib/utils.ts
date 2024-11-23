import {PostItemProp} from "@/interface/PostProp";
import { CommentItemProp } from "@/interface/CommentProp";
import { fetchUrlMetaData } from "./data_api";

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

// export const buildCommentTree = (comments: CommentItemProp[]): Map<number, MapCommentProp> => {
//   const commentMap = new Map<number, MapCommentProp>();

//   // Populate the Map with comments and initialize children arrays
//   comments.forEach(comment => {
//     commentMap.set(comment.comment_id, { ...comment, children_id: [] });
//   });

//   // Establish parent-child relationships
//   comments.forEach(comment => {
//     const { parent_id, comment_id } = comment;

//     if (parent_id) {
//       const parent = commentMap.get(parent_id);

//       if (parent) {
//         // Clone children for immutability and update parent in the map
//         const updatedChildren = parent.children_id ? [...parent.children_id, comment_id] : [comment_id];
//         commentMap.set(parent_id, { ...parent, children_id: updatedChildren });
//       } else {
//         console.warn(`Orphaned comment detected: ${comment_id} (parent: ${parent_id})`);
//       }
//     }
//   });

//   return commentMap;
// };
export const buildCommentTree = (flatComments: CommentItemProp[]): CommentItemProp[] => {
  const commentMap: Record<number, CommentItemProp> = {};
  const tree: CommentItemProp[] = [];

  // Create a map with children initialized
  for (const comment of flatComments) {
    comment.children = [];
    commentMap[comment.comment_id] = comment;
  }

  // Build the tree structure
  for (const comment of flatComments) {
    if (!comment.parent_id) {
      tree.push(comment); // Root comments go to the tree
    } else if (commentMap[comment.parent_id]) {
      commentMap[comment.parent_id].children!.push(comment); // Use non-null assertion for safe push
    }
  }

  return tree;
};

// export const convertMapToNestedArray = (commentMap: Map<number, MapCommentProp>) => {
//   const roots:NestedCommentProp[] = [];
//   const commentCopy = new Map();

//   // Create a deep copy of the commentMap
//   commentMap.forEach((comment, id) => {
//       commentCopy.set(id, { ...comment, children: [] });
//   });

//   // Build the tree structure
//   commentCopy.forEach((comment) => {
//     // console.log(comment);    
//     const { parent_id } = comment;

//     if (parent_id) {
//         const parent = commentCopy.get(parent_id);
//         if (parent) {
//             parent.children.push(comment);
//             // console.log('parent: ', parent);
//         }
//     } else {
//         roots.push(comment); // Add top-level comments
//     }
//   });

//   return roots;
// };


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












