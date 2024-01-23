import styles from "./Orders.module.css";
import { OrderDets } from "../Orderdets/Orderdets";
import { TOrderData } from "../../utils/types";
import { FC } from "react";
type TOrderDatas = {
  data: Array<TOrderData>;
  forProfile: boolean;
};

export const Orders: FC<TOrderDatas> = ({ data, forProfile = false }) => {
  return (
    <ul
      className={
        forProfile ? styles.orders_for_profile : styles.orders_for_feed
      }
    >
      {data ? (
        data?.map((item) => <OrderDets data={item} key={item._id} />)
      ) : (
        <div>Грузим заказы</div>
      )}
    </ul>
  );
};
