import { FeedThumbnailProps } from "@/interface/feed/FeedItemProps";

const FeedThumbnail = ({
  postType,
  thumbnailUrl,
  isVideo
}: FeedThumbnailProps) => {
  if (postType === 'TEXT') {
    return <div className="w-full h-full bg-gray-200 rounded" />
  }
  
  return (
    isVideo? (
      <video src={thumbnailUrl} className="w-full h-full object-cover" />
    ) : (
      <img src={thumbnailUrl} alt="Thumbnail" className="w-full h-full object-cover" />
    )
  )
}

export default FeedThumbnail;
