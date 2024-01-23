import ReactDOM from "react-dom";
import modalStyles from "./Modal.module.css";
import React from "react";
import { ModalOverlay } from "../ModalOverlay/ModalOverlay";
import { ReactNode, FC } from "react";
const modalRoot = document.getElementById("react-modals") as HTMLElement;
type Tmodule = {
  children: ReactNode;
  onClose: () => void;
};
export const Modal: FC<Tmodule> = ({ children, onClose }) => {
  React.useEffect(() => {
    const handleEscClose = (evt: KeyboardEvent) =>
      evt.key === "Escape" ? onClose() : null;
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
};
