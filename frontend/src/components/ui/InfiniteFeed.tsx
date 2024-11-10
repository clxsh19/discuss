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

  const loadMorePosts = async (reset = false) => {
    if (!hasMore && !reset) return;
  
    let fetchResult;
    if (sub_name) {
      fetchResult = await fetchPostsBySub(sub_name, reset? 0: offset, sort, sort === 'top' ? timeframe : '');
    } else {
      fetchResult = await fetchAllPosts(reset? 0: offset, sort, sort === 'top' ? timeframe : '');
    }
  
    const { posts: newPosts, hasMore: newHasMore } = fetchResult;
    const postsWithLinkImg = await buildPostWithMetaData(newPosts);
  
    if (reset) {
      setPosts(postsWithLinkImg);
    } else {
      setPosts(prevPosts => [...prevPosts, ...postsWithLinkImg]);
    }
  
    setHasMore(newHasMore);
    setOffset(reset ? newPosts.length : offset + newPosts.length);
    // setOffset(prevOffset => prevOffset + newPosts.length);
  };
  

  // Initialize with initialPosts
  // useEffect(() => {
  //   setPosts(initialPosts);
  //   setOffset(initialPosts.length);
  //   setHasMore(initialHasMore);
  // }, [initialPosts, initialHasMore]);

  // Observer for infinite scroll
  useEffect(() => {
    if (typeof window === "undefined" || !window.IntersectionObserver) return;

    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && hasMore) {
          console.log('load from infinite scroll');
          loadMorePosts();
        }
      },
      { threshold: 0.5 }
    );

    if (scrollTrigger.current) observer.observe(scrollTrigger.current);

    return () => {
      if (scrollTrigger.current) observer.unobserve(scrollTrigger.current);
    };
  }, [offset, hasMore]);

  useEffect(() => {
    loadMorePosts(true); // Reset and load fresh posts
  }, [sort, timeframe]);

  const handleSortChange = (newSort: string, newTimeFrame?: string) => {
    setSort(newSort);
    setTimeframe(newSort === 'top' && newTimeFrame ? newTimeFrame : 'all');
  };

  // Handle sort and timeframe changes
  // const handleSortChange = (newSort: string, newTimeFrame?: string) => {
  //   setSort(newSort);
  //   setTimeframe(newSort === 'top' && newTimeFrame ? newTimeFrame : '');
  //   setPosts([]);
  //   setHasMore(true);
  //   setOffset(0);
  //   loadMorePosts(0);
  // };

  // Reload posts when sort or timeframe changes
  // useEffect(() => {
    // setOffset(0);
     // Reset and load fresh posts
  // }, [sort, timeframe]);

  return (
    <div className='w-11/12 mx-4 lg:w-9/12 overflow-hidden'>
      <div className="flex bg-white border border-gray-300">
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
        {posts.map((post, index) => (
          <FeedItem key={`${post.post_id}-${index}`} {...post} />
        ))}
      </div>
      <div>
        {hasMore ? (
          <div ref={scrollTrigger}>Loading...</div> 
        ) : (
          <p>No more posts to load</p>
        )}
      </div>
    </div>
  );
};

export default InfiniteFeed;
