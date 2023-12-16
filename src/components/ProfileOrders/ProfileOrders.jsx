import React from "react";
import { Orders } from "../Orders/Orders";
import { useSelector, useDispatch } from "react-redux";
import { WS_CONNECTION_START } from "../../services/actions/wsActions";
import { useAuth } from "../../services/auth";
import styles from "./ProfileOrders.module.css";
export function ProfileOrders() {
  const dispatch = useDispatch();
  const auth = useAuth();
  React.useEffect(() => {
    dispatch({ type: WS_CONNECTION_START });
  }, [dispatch]);
  const orders = useSelector((store) => store.ws.profileOrders);
  return auth.user && orders ? (
    <div className={styles.orders}>
      <Orders data={orders} forProfile={true} />
    </div>
  ) : (
    <h1>Загрузка данных</h1>
  );
}
