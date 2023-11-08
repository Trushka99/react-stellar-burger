import styles from "./ModalOverlay.module.css";

export function ModalOverlay({ onClose }) {
  return <div className={styles.overlay} onClick={onClose}></div>;
}
