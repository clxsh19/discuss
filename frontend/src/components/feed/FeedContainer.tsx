'use client'

import { useState, useRef } from 'react';
import ScrollFeed from './ScrollFeed';
import FeedSorting from './FeedSorting';
import { LoadingIconAnimation } from '../Icons';
import { fetchPostsBySub, fetchAllPosts } from '@/lib/data_api';
import { buildPostWithMetaData } from '@/lib/utils';
import { FeedContainerProps } from '@/interface/feed/FeedProps';
import { PostItemProp } from '@/interface/PostProps';
import { SortType, TimeFrameType } from '@/interface/feed/Types';

const FeedContainer = ({ initialPosts, initialHasMore, subName }: FeedContainerProps) => {
  const [posts, setPosts] = useState<PostItemProp[]>(initialPosts);
  const [sort, setSort] = useState<SortType>('new');
  const [timeframe, setTimeframe] = useState<TimeFrameType>('all');
  const [isSorting, setIsSorting] = useState(false);
  const offsetRef = useRef(initialPosts.length);
  const hasMoreRef = useRef(initialHasMore);

  const loadMorePosts = async (reset = false, newSort?: SortType, newTimeFrame?: TimeFrameType) => {
    console.log('loading new posts')
    if (!hasMoreRef.current && !reset) return;

    // if(reset) setIsSorting(true);

    const newOffset = reset ? 0 : offsetRef.current;
    const result = subName ?
      await fetchPostsBySub(subName, newOffset, newSort, newTimeFrame) :
      await fetchAllPosts(newOffset, newSort, newTimeFrame);

    const { posts: newPosts, hasMore: newHasMore } = result;
    const postsWithLinkImg = await buildPostWithMetaData(newPosts);

    setPosts(prev => reset ? postsWithLinkImg : [...prev, ...postsWithLinkImg]);

    // Update refs
    hasMoreRef.current = newHasMore;
    offsetRef.current = reset ? newPosts.length : offsetRef.current + newPosts.length;

    // if(reset) setIsSorting(false);
  };

  const handleSortChange = async (newSort: SortType, newTimeFrame?: TimeFrameType) => {
    if (newSort === sort && (newSort === 'top' && timeframe === newTimeFrame)) return;
    setSort(newSort);
    setTimeframe(newSort === 'top' && newTimeFrame ? newTimeFrame : 'all');
    setIsSorting(true);
    await loadMorePosts(true, newSort, newTimeFrame);
    setIsSorting(false);
  };

  return (
    <div className="overflow-hidden ">
      <FeedSorting sort={sort} handleSortChange={handleSortChange} isSorting={isSorting} />
      <div className="relative min-h-[300px] sm:min-h-[400px] md:min-h-[500px]">
        {isSorting && (
          <>
            {/* Loading Icon */}
            <div className="absolute top-10 left-1/2 -translate-x-1/2 flex items-center z-[6]">
              <LoadingIconAnimation />
            </div>
            {/* Overlay to dim the background */}
            <div className="absolute inset-0 bg-neutral-950 opacity-100 z-[5]"></div>
          </>
        )}
        <ScrollFeed posts={posts} hasMoreRef={hasMoreRef} subName={subName} loadMorePosts={loadMorePosts} />
      </div>
    </div>
  )
}

export default FeedContainer;

