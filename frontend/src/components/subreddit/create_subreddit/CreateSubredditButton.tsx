"use client"

import { useState } from "react";
import Modal from "@/components/ui/Modal";
import SubredditForm from "./SubredditForm";

const CreateSubredditButton = () => {
  const [showForm, setShowForm] = useState<boolean>(false);
  const onButtonClick = () => {
    setShowForm(!showForm);
  }
  return (
    <>
      <button
        onClick={onButtonClick}
      >
        Create Sub
      </button>

      { showForm && (
        <Modal closeForm={onButtonClick}>
          <SubredditForm />
        </Modal>
      )}
    </>
  )
}

export default CreateSubredditButton;