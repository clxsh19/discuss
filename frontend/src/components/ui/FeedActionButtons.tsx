'use client'

import { CommentIcon, ShareIcon, ExpandIcon, CrossIcon } from '@/components/Icons';
import Link from 'next/link';
import { useState } from 'react';

interface FeedActionButtonsProps {
  post_type: "TEXT" | "MEDIA" | "LINK",
  sub_name: string,
  post_id: number,
  comments_count: number,
  media_url?: string | null,
  isVideo?: RegExpMatchArray | null,
  text_content: string,
}

const FeedActionButtons = ({
  post_type, sub_name, post_id,
  media_url, isVideo, text_content,
  comments_count
}: FeedActionButtonsProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const isLinkPost = post_type === "LINK";

  const handleExpandToggle = () => {
    if (!isLinkPost) setIsExpanded(prev => !prev);
  };

  return (
    <div className="flex flex-col space-y-2">
      <div className="flex text-xs space-x-3">
        {/* Expand/Collapse Button */}
        <button
          onClick={handleExpandToggle}
          disabled={isLinkPost}
          className="cursor-pointer"
        >
          {isLinkPost ? (
            <ExpandIcon fillColor="#4f4949" />
          ) : isExpanded ? (
            <CrossIcon />
          ) : (
            <ExpandIcon />
          )}
        </button>

        {/* Comment Button */}
        <Link href={`/d/${sub_name}/${post_id}`} className="flex items-center space-x-1">
          <CommentIcon />
          <span className="text-gray-400 font-semibold mb-1">{comments_count}</span>
        </Link>

        {/* Share Button */}
        <button className="flex space-x-1">
          <ShareIcon />
          <span className="text-gray-400 font-semibold mb-1">Share</span>
        </button>
      </div>

      {/* Expandable Content */}
      {( !isLinkPost && isExpanded ) && (
        <div className= "max-w-full">
          {media_url ? (
            <div className="w-full max-w-md md:max-w-lg lg:max-w-2xl xl:max-w-3xl mx-auto">
              {isVideo ? (
                <video
                  src={media_url}
                  className="w-full h-auto rounded"
                  controls
                />
              ) : (
                <img
                  src={media_url}
                  alt="Image content"
                  className="w-full h-auto rounded object-cover"
                />
              )}
            </div>
          ) : (
            <div className="p-3 max-w-none text-gray-300 text-sm leading-6 rounded-md bg-neutral-900">
              <pre className="-mt-6 whitespace-pre-wrap font-sans">
                {text_content}
              </pre>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default FeedActionButtons;