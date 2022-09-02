import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import AddReview from "./AddReview";

function AddReviewModal() {
  const [showModal, setShowModal] = useState(false);


  return (
    <>
      <button onClick={() => setShowModal(true)}>Add Review</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <AddReview onClose={() =>setShowModal(false)}/>
        </Modal>
      )}
    </>
  );
}

export default AddReviewModal;