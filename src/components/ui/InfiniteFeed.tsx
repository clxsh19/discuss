'use client';

import { useState, useEffect, useRef } from 'react';
import { PostItemProp } from '@/interface/PostProp';
import { buildPostWithMetaData } from '@/lib/utils';
import FeedItem from '@/components/FeedItem';
import SortDropDown from '../ui/SortDropDown';
import { fetchPostsBySub, fetchAllPosts } from '@/lib/data_api';

interface InfiniteFeedProps { 
  initialPosts: PostItemProp[], 
  initialHasMore: boolean,
  sub_name ?: string,
}

const InfiniteFeed = ({ initialPosts, initialHasMore, sub_name }: InfiniteFeedProps) => {
  const [posts, setPosts] = useState<PostItemProp[]>(initialPosts);
  const [hasMore, setHasMore] = useState(initialHasMore);
  const [offset, setOffset] = useState(initialPosts.length);
  const [sort, setSort] = useState('new');
  const [timeframe, setTimeframe] = useState('all');
  const scrollTrigger = useRef(null);

  const loadMorePosts = async (newOffset = 0) => {
    if (!hasMore && newOffset !== 0) return;
  
    let fetchResult;
    if (sub_name) {
      console.log('fetchinng with sort ', sort);
      fetchResult = await fetchPostsBySub(sub_name, newOffset, sort, sort === 'top' ? timeframe : '');
    } else {
      fetchResult = await fetchAllPosts(newOffset, sort, sort === 'top' ? timeframe : '');
    }
  
    const { posts: newPosts, hasMore: newHasMore } = fetchResult;
    const postsWithLinkImg = await buildPostWithMetaData(newPosts);
  
    if (newOffset === 0) {
      setPosts(postsWithLinkImg);
    } else {
      setPosts(prevPosts => [...prevPosts, ...postsWithLinkImg]);
    }
  
    setHasMore(newHasMore);
    setOffset(prevOffset => prevOffset + newPosts.length);
  };
  

  // Initialize with initialPosts
  useEffect(() => {
    setPosts(initialPosts);
    setOffset(initialPosts.length);
    setHasMore(initialHasMore);
  }, [initialPosts, initialHasMore]);

  // Observer for infinite scroll
  useEffect(() => {
    if (typeof window === "undefined" || !window.IntersectionObserver) return;

    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && hasMore) {
          console.log('load from infinite scroll');
          loadMorePosts(offset);
        }
      },
      { threshold: 0.5 }
    );

    if (scrollTrigger.current) observer.observe(scrollTrigger.current);

    return () => {
      if (scrollTrigger.current) observer.unobserve(scrollTrigger.current);
    };
  }, [offset, hasMore]);

  // Handle sort and timeframe changes
  const handleSortChange = (newSort: string, newTimeFrame?: string) => {
    setSort(newSort);
    setTimeframe(newSort === 'top' && newTimeFrame ? newTimeFrame : '');
    setPosts([]);
    setOffset(0);
    setHasMore(true);
  };

  // Reload posts when sort or timeframe changes
  useEffect(() => {
    console.log('load from reload ', sort)
    loadMorePosts(0); // Reset and load fresh posts
  }, [sort, timeframe]);

  return (
    <>
      <div className="flex w-full ml-4 mb-4 rounded-lg border border-gray-300">
        <button 
          className="ml-4 py-2 rounded-md"
          onClick={() => handleSortChange('hot')}
        >
          Hot
        </button>
        <button 
          className="ml-4 py-2 rounded-md"
          onClick={() => handleSortChange('new')}
        >
          New
        </button>
        <SortDropDown onSortChange={handleSortChange} />
      </div>
      <div>
        {posts.map(post => (
          <FeedItem key={post.post_id} {...post} />
        ))}
      </div>
      <div>
        {hasMore ? (
          <div ref={scrollTrigger}>Loading...</div> 
        ) : (
          <p>No more posts to load</p>
        )}
      </div>
    </>
  );
};

export default InfiniteFeed;
