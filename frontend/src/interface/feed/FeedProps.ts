import { PostItemProp } from "../PostProps";
import { MutableRefObject } from 'react';
import { SortType, TimeFrameType } from "./Types";

export interface FeedSortingProps {
  handleSortChange: (newSort: SortType , newTimeFrame?: TimeFrameType) => Promise<void>;
  sort: SortType;
  isSorting: boolean;
}

export interface FeedContainerProps {
  initialPosts: PostItemProp[];
  initialHasMore: boolean;
  subName?: string;
}

export interface ScrollFeedProps {
  posts: PostItemProp[];
  hasMoreRef: MutableRefObject<boolean>;
  subName?: string;
  loadMorePosts: (reset: boolean) => Promise<void>;
}

export interface SortOnTimeDropDownProps {
  onSortChange: (sort: SortType, timeframe?: TimeFrameType) => void;
  isSorting: boolean;
}

