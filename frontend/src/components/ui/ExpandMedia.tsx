'use client';

import { useState } from "react";

interface ExpandViewProps {
  post_type: "MEDIA" | "TEXT" | "LINK";
  media_url?: string | null;
  text_content?: string;
}

const ExpandMedia = ({ media_url, text_content }: ExpandViewProps) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const onClickExpand = () => {
    setIsExpanded(!isExpanded);
  };

  // Determine if media is a video based on file extension
  const isVideo = media_url?.match(/\.(mp4|webm|ogg)$/i);

  return (
    <div className="">
      {/* Toggle Button */}
      <div
        onClick={onClickExpand}
        className="cursor-pointer border w-6 h-6 mt-2 flex items-center justify-center rounded bg-gray-200"
      >
        {isExpanded ? "◢" : "◤"}
      </div>

      {/* Expandable Content */}
      {isExpanded && (          
        <div className="mt-4 rounded-md max-w-full">
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
            <p>{text_content}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ExpandMedia;
