'use client';

import { useState, useEffect, useRef } from 'react';
import { PostItemProp } from '@/interface/PostProp';
import { buildPostWithMetaData } from '@/lib/utils';
import FeedItem from '@/components/FeedItem';
import SortDropDown from './ui/SortDropDown';
import { fetchPostsBySub, fetchAllPosts } from '@/lib/data_api';

interface InfiniteFeedProps { 
  initialPosts: PostItemProp[], 
  initialHasMore: boolean,
  sub_name ?: string,
}
const InfiniteFeed = ({ initialPosts, initialHasMore, sub_name }: InfiniteFeedProps) => {
  const [posts, setPosts] = useState<PostItemProp[]>(initialPosts);
  const [sort, setSort] = useState('new');
  const [timeframe, setTimeframe] = useState('all');

  const offsetRef = useRef(initialPosts.length); // Track offset
  const hasMoreRef = useRef(initialHasMore); // Track hasMore
  const scrollTrigger = useRef<HTMLDivElement | null>(null);

  const loadMorePosts = async (reset = false) => {
    if (!hasMoreRef.current && !reset) return;

    const newOffset = reset ? 0 : offsetRef.current;
    const fetchResult = sub_name 
      ? await fetchPostsBySub(sub_name, newOffset, sort, sort === 'top' ? timeframe : '')
      : await fetchAllPosts(newOffset, sort, sort === 'top' ? timeframe : '');

    const { posts: newPosts, hasMore: newHasMore } = fetchResult;
    const postsWithLinkImg = await buildPostWithMetaData(newPosts);

    setPosts(prev => reset ? postsWithLinkImg : [...prev, ...postsWithLinkImg]);

    hasMoreRef.current = newHasMore; // Update ref
    offsetRef.current = reset ? newPosts.length : offsetRef.current + newPosts.length;
  };

  // Infinite Scroll Effect
  useEffect(() => {
    if (posts.length === 5 && offsetRef.current === 0) return;
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
    };
  }, []); // Dependency array excludes hasMore, as it's a ref now

  useEffect(() => {
    if (posts.length === 5 && offsetRef.current === 0) return;
    loadMorePosts(true); // Reset and load fresh posts
  }, [sort, timeframe]);

  const handleSortChange = (newSort: string, newTimeFrame?: string) => {
    setSort(newSort);
    setTimeframe(newSort === 'top' && newTimeFrame ? newTimeFrame : 'all');
  };

  return (
    <div className="overflow-hidden">
      <div className="flex items-center space-x-0.5 mb-2 text-white">
        <button 
          className="p-2 rounded-l-lg border border-gray-800 hover:bg-neutral-900"
          onClick={() => handleSortChange('hot')}
        >
          Hot
        </button>
        <button 
          className="p-2 border border-gray-800  hover:bg-neutral-900"
          onClick={() => handleSortChange('new')}
        >
          New
        </button>
        <div className="flex items-center p-2 rounded-r-lg border border-gray-800 cursor-default hover:bg-neutral-900">
          <SortDropDown onSortChange={handleSortChange} />
        </div>
      </div>
      <div>
        {posts.map((post, index) => {
          post.sub_feed = sub_name? true : false;
          return (
            <FeedItem key={`${post.post_id}-${index}`} {...post} />
          )})
        }
      </div>
      <div ref={scrollTrigger}>{hasMoreRef.current ? 'Loading...' : 'No more posts'}</div>
    </div>
  );
};

export default InfiniteFeed;