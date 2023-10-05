import ReactDOM from "react-dom";
import modalStyles from "./Modal.module.css";

const modalRoot = document.getElementById("react-modals");


  
  export default function Modal({ open, children, onClose }) {
    if (!open) return null
  
    return ReactDOM.createPortal(
      <>
        <div onClick={onClose} className={modalStyles.overlay} />
        <div className={modalStyles.modal}>
        <button className={modalStyles.close} onClick={onClose} />
          {children}
        </div>
      </>,
      modalRoot
    )
  }