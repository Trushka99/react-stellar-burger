import React from "react";
import { Orders } from "../Orders/Orders";
import { useSelector, useDispatch } from "react-redux";
import {
  WS_CONNECTION_START,
  WS_CONNECTION_CLOSED,
} from "../../services/actions/wsActions";
import { useAuth } from "../../services/auth";
import styles from "./ProfileOrders.module.css";
export function ProfileOrders() {
  const dispatch = useDispatch();
  const auth = useAuth();

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
}
