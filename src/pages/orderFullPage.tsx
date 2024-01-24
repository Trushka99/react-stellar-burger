import { OrderModal } from "../components/OrderModal/OrderModal";
import styles from "./orderFullPage.module.css";
import { useDispatch } from "../utils/hooks";
import React, { FC } from "react";
import { TOrderInfo } from "../components/OrderModal/OrderModal";
import {
  WS_CONNECTION_START,
  WS_CONNECTION_CLOSED,
} from "../services/actions/wsActions";
export const OrderFullPage: FC<TOrderInfo> = ({ data }) => {
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch({ type: WS_CONNECTION_START });
    return () => {
      dispatch({ type: WS_CONNECTION_CLOSED });
    };
  }, [dispatch]);

  return (
    <div className={styles.fullpageContainer}>
      <OrderModal data={data} />
    </div>
  );
};
