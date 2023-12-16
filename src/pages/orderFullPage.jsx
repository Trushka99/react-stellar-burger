import { OrderModal } from "../components/OrderModal/OrderModal";
import styles from "./orderFullPage.module.css";
export const OrderFullPage = () => {
  return (
    <div className={styles.fullpageContainer}>
      <OrderModal />
    </div>
  );
};
