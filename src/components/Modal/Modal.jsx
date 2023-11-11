import ReactDOM from "react-dom";
import modalStyles from "./Modal.module.css";
import React from "react";
import { ModalOverlay } from "../ModalOverlay/ModalOverlay";
const modalRoot = document.getElementById("react-modals");

export  function Modal({ children, onClose }) {
  React.useEffect(() => {
    const handleEscClose = (evt) => (evt.key === "Escape" ? onClose() : null);
    document.addEventListener("keydown", handleEscClose);
    return () => document.removeEventListener("keydown", handleEscClose);
  }, [onClose]);

  return ReactDOM.createPortal(
    <>
      <ModalOverlay onClose={onClose} />
      <div className={modalStyles.modal}>
        <button className={modalStyles.close} onClick={onClose} />
        {children}
      </div>
    </>,
    modalRoot
  );
}
