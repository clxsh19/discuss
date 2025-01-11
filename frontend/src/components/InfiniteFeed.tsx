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

    let fetchResult;
    if (sub_name) {
      fetchResult = await fetchPostsBySub(sub_name, reset ? 0 : offsetRef.current, sort, sort === 'top' ? timeframe : '');
    } else {
      fetchResult = await fetchAllPosts(reset ? 0 : offsetRef.current, sort, sort === 'top' ? timeframe : '');
    }

    const { posts: newPosts, hasMore: newHasMore } = fetchResult;
    const postsWithLinkImg = await buildPostWithMetaData(newPosts);

    if (reset) {
      setPosts(postsWithLinkImg);
    } else {
      setPosts(prevPosts => [...prevPosts, ...postsWithLinkImg]);
    }

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

  // const handleSortChange = (newSort: string, newTimeFrame?: string) => {
  //   setSort(newSort);
  //   setTimeframe(newSort === 'top' && newTimeFrame ? newTimeFrame : 'all');
  // };

  return (
    <div className=" overflow-hidden">
      <div>
        {posts.map((post, index) => (
          <FeedItem key={`${post.post_id}-${index}`} {...post} />
        ))}
      </div>
      <div ref={scrollTrigger}>{hasMoreRef.current ? 'Loading...' : 'No more posts'}</div>
    </div>
  );
};

export default InfiniteFeed;