import Image from "next/image";
import { FeedThumbnailProps } from "@/interface/feed/FeedItemProps";

const FeedThumbnail = ({
  postType,
  thumbnailUrl,
  isVideo
}: FeedThumbnailProps) => {
  if (postType === 'TEXT') {
    return <div className="w-full h-full bg-gray-200 rounded" />
  }
  return thumbnailUrl ? (
    isVideo ? (
      <video
        src={thumbnailUrl}
        className="w-full h-full object-cover"
        muted
        loop
        playsInline
      />
    ) : (
      <div className="relative w-full h-full">
        <Image
          src={thumbnailUrl}
          alt="Thumbnail"
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
    )
  ) : (
    // Fallback for when thumbnailUrl is null/undefined
    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
      <span className="text-gray-500">No thumbnail</span>
    </div>
  )
}

export default FeedThumbnail;
