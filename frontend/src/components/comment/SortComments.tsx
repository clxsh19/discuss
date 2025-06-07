import { useComments } from "../context/CommentContext";
import { PostIdProp } from "@/interface/comment/CommentContainerProps";

const  SortComments = ({ post_id }: PostIdProp) => {
  const { sortComments } = useComments();

  return (
    <div className="w-4/6 flex items-center space-x-0.5 mb-2 text-white">
      <button 
        className="p-2 rounded-l-lg border border-gray-800 hover:bg-neutral-900"
        onClick={() => sortComments(post_id, 'new')}
      >
        New
      </button>
      <button 
        className="p-2 border border-gray-800  hover:bg-neutral-900"
        onClick={() => sortComments(post_id, 'top')}
      >
        Top
      </button>
      <button 
        className="p-2 pr-3 rounded-r-lg border border-gray-800 hover:bg-neutral-900" 
        onClick={() => sortComments(post_id, 'old')}
      >
        Old
      </button>
    </div>
  )
}

export default SortComments;
