import React, { FC } from "react";
import { Orders } from "../Orders/Orders";
import { useSelector, useDispatch } from "../../utils/hooks";
import {
  WS_CONNECTION_START,
  WS_CONNECTION_CLOSED,
} from "../../services/actions/wsActions";
import styles from "./ProfileOrders.module.css";
export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch({ type: WS_CONNECTION_START });
    return () => {
      dispatch({ type: WS_CONNECTION_CLOSED });
    };
  }, [dispatch]);
  const orders = useSelector((store) => store.ws.profileOrders);
  return (
    <div className={styles.orders}>
      <Orders data={orders} forProfile={true} />
    </div>
  );
};
