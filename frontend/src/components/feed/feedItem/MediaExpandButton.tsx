import { CrossIcon, ExpandIcon } from "@/components/Icons";
import { MediaExpandButtonProps } from "@/interface/feed/FeedItemProps";

const MediaExpandButton = ({ 
  isLinkPost,
  handleExpandToggle,
  isExpanded
} : MediaExpandButtonProps) => {
  if (isLinkPost) {
    return(
      <button
        className="not-allowed"
        disabled
      >
        <ExpandIcon fillColor="#4f4949"/>
      </button>
    )
  }

  return (
    <button
      onClick={handleExpandToggle}
      disabled={isLinkPost}
      className="cursor-pointer"
    >
      {isExpanded ? <CrossIcon /> : <ExpandIcon />}
    </button>
  )
}

export default MediaExpandButton;
