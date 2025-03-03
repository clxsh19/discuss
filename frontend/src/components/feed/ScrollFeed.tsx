'use client';

import { useEffect, useRef, useState, useMemo } from 'react';
import FeedItem from '@/components/feed/feedtem/FeedItem';
import { LoadingIconAnimation } from '../Icons';
import { ScrollFeedProps } from '@/interface/feed/ScrollFeedProps';

const ScrollFeed = ({ posts, hasMoreRef, subName, loadMorePosts }: ScrollFeedProps) => {
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const scrollTrigger = useRef<HTMLDivElement | null>(null);

  const handleLoadMorePosts = async() => {
    setIsLoadingMore(true);
    await loadMorePosts(false);
    setIsLoadingMore(false)
  }

  // Infinite Scroll Effect
  useEffect(() => {
    if (isLoadingMore) return;
    console.log(isLoadingMore)

    // if (posts.length === 5 && offsetRef.current === 0) return;
    if (typeof window === "undefined" || !window.IntersectionObserver) return;

    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && hasMoreRef.current && !isLoadingMore) {
          handleLoadMorePosts()
        }
      },
      { threshold: 0.5 }
    );

    if (scrollTrigger.current) observer.observe(scrollTrigger.current);

    return () => {
      if (scrollTrigger.current) observer.unobserve(scrollTrigger.current);
      observer.disconnect();
    };
  }, [isLoadingMore]);
  
  // const postItems = useMemo(() => 
  //   posts.map((post, index) => {
  //     const postWithSubFeed = { ...post, sub_feed: !!subName };
  //     return <FeedItem key={`${post.post_id}-${index}`} {...postWithSubFeed} />;
  //   }),
  //   [posts, subName]
  // );

  return (
    <>
      {/* Post List */}
      {posts.map((post, index) => {
        post.sub_feed = !!subName;
        return <FeedItem key={`${post.post_id}-${index}`} {...post} />;
      })}

      <div className="mt-4 text-white flex flex-col justify-center items-center space-y-2" 
        ref={scrollTrigger}
      >
        {isLoadingMore ? (
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
    </>
  );
};

export default ScrollFeed;
