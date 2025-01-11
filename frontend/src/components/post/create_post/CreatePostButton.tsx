"use client"

import { useState } from "react";
import Modal from "@/components/ui/Modal";
import CreatePost from "./CreatePost";

const CreatePostButton = ({ sub_name } : { sub_name: string }) => {
  const [showForm, setShowForm] = useState<boolean>(false);
  const onButtonClick = () => {
    setShowForm(!showForm);
  }
  return (
    <>
      <button
        onClick={onButtonClick}
      >
        Create Post
      </button>

      { showForm && (
        <Modal closeForm={onButtonClick}>
          <CreatePost sub_name={sub_name} />
        </Modal>
      )}
    </>
  )
}

export default CreatePostButton;