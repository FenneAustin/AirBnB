import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import SignupFormPage from "./SignupForm";

function SignupFormModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)}>Sign Up</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <SignupFormPage closeModal={() => setShowModal(false)} />
        </Modal>
      )}
    </>
  );
}

export default SignupFormModal;
