import { postType } from '../PostProps';

export interface FeedActionButtonsProps {
  postType: postType;
  subName: string;
  postId: number;
  commentsCount: number;
  mediaUrl?: string;
  isVideo: boolean;
  textContent: string;
  subFeed: boolean;
}

export interface FeedThumbnailProps {
  postType: postType;
  isVideo: boolean;
  thumbnailUrl?: string;
}

export interface MediaExpandButtonProps {
  isLinkPost: boolean;
  isExpanded: boolean;
  handleExpandToggle: () => void;
}
