import { useComments } from "../../context/CommentContext";
import { deleteComment } from "@/lib/create_api";
import { showErrorToast } from "../../ui/toasts";

interface CommentDeleteConfirmProps {
  comment_id: number,
  setShowDeleteConfirm: React.Dispatch<React.SetStateAction<boolean>>
}

const CommentDeleteConfirm = ({ comment_id, setShowDeleteConfirm }: CommentDeleteConfirmProps) => {
  const { softDeleteComment } = useComments();

  const handleSubmit = async() => {
    try {
      await deleteComment(comment_id);
      softDeleteComment(comment_id);
      setShowDeleteConfirm(false);
    } catch (err) {
      showErrorToast('Failed to delete comment.')
    }
  }

  return (
    <div className="flex ml-3 text-red-600 font-semibold">
      <>Are you sure?</>
      <button
        onClick={handleSubmit}
        className="ml-1 hover:underline"
      >
        Yes
      </button>
      <div className="ml-0.5">
        /
      </div>
      <button
        onClick={() => setShowDeleteConfirm(false)}
        className="ml-0.5 hover:underline"
      >
        No
      </button>
    </div>
  )
}

export default CommentDeleteConfirm;
