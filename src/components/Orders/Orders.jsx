import styles from "./Orders.module.css";
import { OrderDets } from "../Orderdets/Orderdets";
export const Orders = ({ data, forProfile = false }) => {
  return (
    <ul
      className={
        forProfile ? styles.orders_for_profile : styles.orders_for_feed
      }
    >
      {data ? (
        data.map((item) => <OrderDets {...item} key={item._id} />)
      ) : (
        <div>Грузим заказы</div>
      )}
    </ul>
  );
};
