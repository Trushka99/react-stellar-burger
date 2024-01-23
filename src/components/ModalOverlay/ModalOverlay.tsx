import styles from "./ModalOverlay.module.css";
import { FC } from "react";
export const ModalOverlay: FC<{ onClose: () => void }> = ({ onClose }) => {
  return <div className={styles.overlay} onClick={onClose}></div>;
};
