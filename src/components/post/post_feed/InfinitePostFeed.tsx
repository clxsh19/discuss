'use client';

import { useState, useEffect,  useRef } from 'react';
import { PostItemProp } from '@/interface/PostProp';
import { fetchAllPosts } from '@/lib/data_api';
import { buildPostWithMetaData } from '@/lib/utils';
import FeedItem from './FeedItem';

const InfinitePostFeed = ({ initialPosts }: { initialPosts: PostItemProp[] }) => {
  const [posts, setPosts] = useState<PostItemProp[]>([]);
  const [hasMore, setHasMore] = useState(false);
  const [offset, setOffset] = useState(0);
  const scrollTrigger = useRef(null);

  const loadMorePosts = async () => {
    console.log('loadMorePosts');
    if (!hasMore) return;
    const { posts: newPosts, hasMore: newHasMore } = await fetchAllPosts(offset);
    const postsWithLinkImg = await buildPostWithMetaData(newPosts);
    setPosts((prevPosts) => [...prevPosts, ...postsWithLinkImg]);
    setHasMore(newHasMore);
    setOffset((prevOffset) => prevOffset + newPosts.length);
  };

  useEffect(() => {
    setPosts(initialPosts);
    setOffset(initialPosts.length);
    setHasMore(true);
  }, [initialPosts]);

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
        {/* {posts.map((post) => (
          <FeedItem key={post.post_id} {...post} />
        ))} */}
        {
          posts.map((post) => {
              console.log('looping');
            
            return(
              <FeedItem key={'post'+post.post_id} {...post} />
            )
          })
        }
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
