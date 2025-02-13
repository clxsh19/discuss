'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { PostItemProp } from '@/interface/PostProp';
import { buildPostWithMetaData } from '@/lib/utils';
import FeedItem from '@/components/FeedItem';
import SortDropDown from './ui/SortDropDown';
import { fetchPostsBySub, fetchAllPosts } from '@/lib/data_api';
import { LoadingIconAnimation } from './Icons';

type SortType = 'hot' | 'new' | 'top';

interface InfiniteFeedProps {
  initialPosts: PostItemProp[],
  initialHasMore: boolean,
  sub_name?: string,
}

const InfiniteFeed = ({ initialPosts, initialHasMore, sub_name }: InfiniteFeedProps) => {
  const [posts, setPosts] = useState<PostItemProp[]>(initialPosts);
  const [sort, setSort] = useState<'new' | 'top' | 'hot'>('new');
  const [timeframe, setTimeframe] = useState('all');
  const [isLoading, setIsLoading] = useState(false);
  const [isSorting, setIsSorting] = useState(false);

  const offsetRef = useRef(initialPosts.length); 
  const hasMoreRef = useRef(initialHasMore);
  const scrollTrigger = useRef<HTMLDivElement | null>(null);

  const loadMorePosts = useCallback(async (reset = false) => {
    if (!hasMoreRef.current && !reset) return;
    // if (reset) setPosts([]);
    reset? setIsSorting(true) : setIsLoading(true);

    const newOffset = reset ? 0 : offsetRef.current;
    const fetchResult = sub_name
      ? await fetchPostsBySub(sub_name, newOffset, sort, timeframe)
      : await fetchAllPosts(newOffset, sort, timeframe);
  
    const { posts: newPosts, hasMore: newHasMore } = fetchResult;
    const postsWithLinkImg = await buildPostWithMetaData(newPosts);
  
    setPosts(prev => reset ? postsWithLinkImg : [...prev, ...postsWithLinkImg]);
  
    hasMoreRef.current = newHasMore; // Update ref
    offsetRef.current = reset ? newPosts.length : offsetRef.current + newPosts.length;
    setIsLoading(false);
    setIsSorting(false);
  }, [sort, timeframe, sub_name]);  

  // Infinite Scroll Effect
    useEffect(() => {
    // if (posts.length === 5 && offsetRef.current === 0) return;
    if (typeof window === "undefined" || !window.IntersectionObserver) return;

    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && hasMoreRef.current) {
          loadMorePosts();
        }
      },
      { threshold: 0.5 }
    );

    if (scrollTrigger.current) observer.observe(scrollTrigger.current);

    return () => {
      if (scrollTrigger.current) observer.unobserve(scrollTrigger.current);
      observer.disconnect();
    };
  }, [loadMorePosts]);


  useEffect(() => {
    // if (posts.length === 5 && offsetRef.current === 0) return;
    loadMorePosts(true); // Reset and load fresh posts
  }, [sort, timeframe]);

  const handleSortChange = useCallback((newSort: SortType, newTimeFrame?: string) => {
    setSort(newSort);
    setTimeframe(newSort === 'top' && newTimeFrame ? newTimeFrame : 'all');
  }, []);
  

  return (
    <div className="overflow-hidden ">
      <div className="flex items-center space-x-0.5 mb-2 text-white">
        <button
          className={`p-2 rounded-l-lg border border-gray-800 
            ${sort === 'hot' ? 'bg-neutral-800' : 'hover:bg-neutral-900'}`}
          onClick={() => handleSortChange('hot')}
        >
          Hot
        </button>
        <button
          className={`p-2 border border-gray-800
            ${sort === 'new' ? 'bg-neutral-800' : 'hover:bg-neutral-900'}`}
          onClick={() => handleSortChange('new')}
        >
          New
        </button>
        <div className={`flex items-center p-2 rounded-r-lg border border-gray-800 cursor-pointer
          ${sort === 'top' ? 'bg-neutral-800' : 'hover:bg-neutral-900'}`}>
          <SortDropDown onSortChange={handleSortChange} />
        </div>
      </div>
      
      <div className="relative min-h-[300px] sm:min-h-[400px] md:min-h-[500px]">
        {isSorting && (
          <>
            {/* Loading Icon */}
            <div className="absolute top-10 left-1/2 -translate-x-1/2 flex items-center z-[6]">
              <LoadingIconAnimation />
            </div>
            {/* Overlay to dim the background */}
            <div className="absolute inset-0 bg-neutral-950 opacity-80 z-[5]"></div>
          </>
        )}

        {/* Post List */}
        {posts.map((post, index) => {
          post.sub_feed = !!sub_name;
          return <FeedItem key={`${post.post_id}-${index}`} {...post} />;
        })}

        <div className="mt-4 text-white flex flex-col justify-center items-center space-y-2" 
          ref={scrollTrigger}
        >
          {isLoading ? (
            <>
              <span className="text-sm text-gray-400">Loading posts</span>
              <LoadingIconAnimation />
            </>
          ) : hasMoreRef.current ? (
            <span className="text-sm text-gray-400">Scroll down for more</span>
          ) : (
            <span className="text-sm text-gray-400">No more posts</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default InfiniteFeed;
      {/* { isSorting && (
        <div className='absolute top-0  flex items-center'>
          <LoadingIconAnimation />
        </div>
      )} */}
      {/* <div className='absolute top-0 left-1/2 flex items-center '>
          <LoadingIconAnimation />
        </div>
      <div className="absolute inset-0  bg-neutral-950"> 
      </div> */} 
