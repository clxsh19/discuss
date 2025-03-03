import { PostItemProp } from '@/interface/PostProps';
import { MutableRefObject } from 'react';

export interface ScrollFeedProps {
  posts: PostItemProp[];
  hasMoreRef: MutableRefObject<boolean>;
  subName?: string;
  loadMorePosts: (reset: boolean) => Promise<void>;
}
