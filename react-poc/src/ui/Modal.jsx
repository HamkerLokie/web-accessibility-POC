import React, { useEffect, useRef } from 'react';

const Modal = ({ isOpen, onClose, children }) => {
  const modalRef = useRef(null);
  const firstFocusableElementRef = useRef(null);
  const lastFocusableElementRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      firstFocusableElementRef.current.focus();
    }
  }, [isOpen]);

  const handleKeyDown = (e) => {
    const isTabPressed = e.key === 'Tab';
    if (e.key === 'Escape') {
      onClose();
    }

    if (!isTabPressed) return;

    if (e.shiftKey) {
      if (document.activeElement === firstFocusableElementRef.current) {
        e.preventDefault();
        lastFocusableElementRef.current.focus();
      }
    } else {
      if (document.activeElement === lastFocusableElementRef.current) {
        e.preventDefault();
        firstFocusableElementRef.current.focus();
      }
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="overlay" onClick={onClose}></div>
      <div
        ref={modalRef}
        className="modal"
        onKeyDown={handleKeyDown}
        role="dialog"
        aria-labelledby="modalTitle"
      >
        {children({
          firstFocusableElementRef,
          lastFocusableElementRef
        })}
      </div>
    </>
  );
};

export default Modal;
