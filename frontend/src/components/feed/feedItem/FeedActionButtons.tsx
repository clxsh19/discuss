'use client'

import Link from 'next/link';
import { useState } from 'react';
import { CommentIcon, ShareIcon } from '@/components/Icons';
import { FeedActionButtonsProps } from '@/interface/feed/FeedItemProps';
import MediaExpandButton from './MediaExpandButton';

const FeedActionButtons = ({
  postType, subName, postId,
  mediaUrl, isVideo, textContent,
  commentsCount, subFeed
}: FeedActionButtonsProps) => {
  const [isExpanded, setIsExpanded] = useState(subFeed);
  const isLinkPost = postType === "LINK";

  const handleExpandToggle = () => {

    if (!isLinkPost) setIsExpanded(prev => !prev);
  };

  return (
    <div className="flex flex-col space-y-2">
      <div className="flex text-xs space-x-3">
        {/* Expand/Collapse Button */}
        <MediaExpandButton
          isLinkPost={isLinkPost}
          isExpanded={isExpanded}
          handleExpandToggle={handleExpandToggle}
        />

        {/* Comment Button */}
        <Link href={`/d/${subName}/${postId}`} className="flex items-center space-x-1">
          <CommentIcon />
          <span className="text-gray-400 font-semibold mb-1">{commentsCount}</span>
        </Link>

        {/* Share Button */}
        <button className="flex space-x-1">
          <ShareIcon />
          <span className="text-gray-400 font-semibold mb-1">Share</span>
        </button>
      </div>

      {/* Expandable Content */}
      {(!isLinkPost && isExpanded) && (
        <div className="max-w-full">
          {/* Show media on expand */}
          {mediaUrl && (
            <div className="w-full max-w-md md:max-w-lg lg:max-w-2xl xl:max-w-3xl mx-auto">
              {isVideo ? (
                <video
                  src={mediaUrl}
                  className="w-full h-auto rounded"
                  controls
                />
              ) : (
                <img
                  src={mediaUrl}
                  alt="Image content"
                  className="w-full h-auto rounded object-cover"
                  loading='lazy'
                />
              )}
            </div>
          )}
          {/* No mediaUrl so show text content on expand */}
          {(!mediaUrl && textContent) && (
            <div className="p-3 max-w-none text-gray-300 text-sm leading-6 rounded-md bg-neutral-900">
              <pre className="-mt-2 whitespace-pre-wrap font-sans">
                {textContent}
              </pre>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default FeedActionButtons;
