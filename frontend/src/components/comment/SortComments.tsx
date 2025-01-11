import { useComments } from "../context/CommentContext";

const  SortComments = ({post_id} : {post_id: number}) => {
  const { sortComments } = useComments();

  return (
    <div className="flex mx-4 p-1 w-11/12 lg:w-9/12 rounded-t-lg bg-white ">
      <button 
        className="ml-4 py-2 rounded-md"
        onClick={() => sortComments(post_id, 'new')}
      >
        New
      </button>
      <button 
        className="ml-4 py-2 rounded-md"
        onClick={() => sortComments(post_id, 'top')}
      >
        Top
      </button>
      <button 
        className="ml-4 py-2 rounded-md"
        onClick={() => sortComments(post_id, 'old')}
      >
        Old
      </button>
    </div>
  )
}

export default SortComments;