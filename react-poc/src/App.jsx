import React, { useRef, useState } from 'react';
import Modal from './ui/Modal';
import './App.css';

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModalButtonRef = useRef(null);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    openModalButtonRef.current.focus();
  };

  return (
    <div>
      <h1>Keyboard Accessibility Example</h1>
      <button ref={openModalButtonRef} onClick={openModal} tabIndex={1}>
        Open Modal (focused first)
      </button>

      <br /><br />

      <button tabIndex={3}>Button to be focused third</button>
      <br /><br />

      <button tabIndex={2}>Button to be focused second</button>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        {({ firstFocusableElementRef, lastFocusableElementRef }) => (
          <>
            <h2 id="modalTitle">Modal Title</h2>
            <p>Press "Esc" to close this modal or tab through the form fields.</p>
            <form>
              <label htmlFor="name">Name:</label>
              <input ref={firstFocusableElementRef} type="text" id="name" name="name" />

              <br /><br />

              <label htmlFor="email">Email:</label>
              <input  type="email" id="email" name="email" />

              <br /><br />

              <button
                type="button"
                ref={lastFocusableElementRef}
                onClick={closeModal}
              >
                Close Modal
              </button>
            </form>
          </>
        )}
      </Modal>
    </div>
  );
};

export default App;
