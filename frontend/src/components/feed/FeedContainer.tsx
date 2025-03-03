'use client'

import { useState, useRef } from 'react';
import ScrollFeed from './ScrollFeed';
import FeedSorting from './FeedSorting';
import { fetchPostsBySub, fetchAllPosts } from '@/lib/data_api';
import { buildPostWithMetaData } from '@/lib/utils';
import { FeedContainerProps } from '@/interface/feed/FeedContainerProps';
import { PostItemProp } from '@/interface/PostProps';
import { SortType, TimeFrameType } from '@/interface/feed/Types';

const FeedContainer = ({initialPosts, initialHasMore, subName}: FeedContainerProps) => {
  const [posts, setPosts] = useState<PostItemProp[]>(initialPosts);
  const [sort, setSort] = useState<SortType>('new');
  const [timeframe, setTimeframe] = useState<TimeFrameType>('all');
  const [isSorting, setIsSorting] = useState(false);
  const offsetRef = useRef(initialPosts.length); 
  const hasMoreRef = useRef(initialHasMore);

  const loadMorePosts = async (reset = false, newSort?:SortType, newTimeFrame?:TimeFrameType) => {
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

  const handleSortChange = async(newSort: SortType, newTimeFrame?: TimeFrameType) => {
    if(newSort === sort) return;
    setSort(newSort);
    setTimeframe(newSort === 'top' && newTimeFrame ? newTimeFrame : 'all');
    setIsSorting(true);
    await loadMorePosts(true, newSort, newTimeFrame);
    setIsSorting(false);
  };
  
  return (
    <div className="overflow-hidden ">
      <FeedSorting sort={sort} handleSortChange={handleSortChange} isSorting={isSorting}/>
      <ScrollFeed posts={posts} hasMoreRef={hasMoreRef} subName={subName} loadMorePosts={loadMorePosts}/>
    </div>
  )
}

export default FeedContainer;
