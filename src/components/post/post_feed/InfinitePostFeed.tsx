'use client';

import { useState, useEffect,  useRef } from 'react';
import { PostItemProp } from '@/interface/PostProp';
import { fetchAllPosts } from '@/lib/data_api';
import { buildPostWithMetaData } from '@/lib/utils';
import FeedItem from './FeedItem';

const InfinitePostFeed = ({ initialPosts }: { initialPosts: PostItemProp[] }) => {
  const [posts, setPosts] = useState<PostItemProp[]>(initialPosts);
  const [hasMore, setHasMore] = useState(true);
  const [offset, setOffset] = useState(initialPosts.length);
  const scrollTrigger = useRef(null);

  const loadMorePosts = async () => {
    if (hasMore) {
      const { posts, hasMore } = await fetchAllPosts(offset);
      const postsWithLinkImg = await buildPostWithMetaData(posts);
      setHasMore(hasMore);
      setPosts((prevPosts) => [...prevPosts, ...postsWithLinkImg]);
      setOffset((prevOffset) => prevOffset + posts.length);
    }
  };

  useEffect(() => {
    if (typeof window === "undefined" || !window.IntersectionObserver) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMorePosts();
        }
      },
      { threshold: 0.5 }
    );
  
    if (scrollTrigger.current) {
      observer.observe(scrollTrigger.current);
    }
  
    // Cleanup
    return () => {
      if (scrollTrigger.current) {
        observer.unobserve(scrollTrigger.current);
      }
    };
  
    // ...
  }, [hasMore,  offset]);

  return (
    <>
      <div>
        {posts.map((post) => (
          <FeedItem key={post.post_id} {...post} />
        ))}
      </div>
      <div>
        {hasMore ? (
          <div ref={scrollTrigger}>Loading...</div> 
        ) : ( 
          <p className="...">No more posts to load</p>
        )}
      </div>
    </>
  );
};

export default InfinitePostFeed;
