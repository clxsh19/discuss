'use client';

import { useState, useEffect, useRef } from 'react';
import { PostItemProp } from '@/interface/PostProp';
import { fetchPostsBySub } from "@/lib/data_api";
import { buildPostWithMetaData } from '@/lib/utils';
import FeedItem from '@/components/FeedItem';
import SortDropDown from '../ui/SortDropDown';

interface InfiniteSubFeedProps { 
  sub_name: string,
  initialPosts: PostItemProp[], 
  initialHasMore: boolean 
}

const InfiniteSubFeed = ({ sub_name, initialPosts, initialHasMore }: InfiniteSubFeedProps) => {
  const [posts, setPosts] = useState<PostItemProp[]>(initialPosts);
  const [hasMore, setHasMore] = useState(initialHasMore);
  const [offset, setOffset] = useState(initialPosts.length);
  const [sort, setSort] = useState('new');
  const [timeframe, setTimeframe] = useState('all');
  const scrollTrigger = useRef(null);

  const loadMorePosts = async (newOffset = 0) => {
    if (!hasMore && newOffset !== 0) return;

    const { posts: newPosts, hasMore: newHasMore } = await fetchPostsBySub(sub_name, newOffset, sort, sort === 'top' ? timeframe : '');
    const postsWithLinkImg = await buildPostWithMetaData(newPosts);

    if (newOffset === 0) {
      // Reset posts on sort/timeframe change
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
          loadMorePosts(offset);
        }
      },
      { threshold: 0.5 }
    );

    if (scrollTrigger.current) observer.observe(scrollTrigger.current);

    return () => {
      if (scrollTrigger.current) observer.unobserve(scrollTrigger.current);
    };
  }, [offset, hasMore, sort, timeframe]);

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

export default InfiniteSubFeed;
