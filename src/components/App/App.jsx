import React from "react";
import styles from "./App.module.css";
import { Routes, Route } from "react-router-dom";
import { FullIngredientPage } from "../FullIngredientPage/FullIngredientPage";
import { Header } from "../Headers/Header";
import { BurgerIngredients } from "../BurgerIngridients/BurgerIngredients";
import { BurgerConstructor } from "../BurgerConstructor/BurgerConstructor";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { getItems } from "../../services/actions/getIngridients";
import { useDispatch } from "react-redux";
import { LoginPage } from "../../pages/login";
import { RegisterPage } from "../../pages/register";
import { ResetPassword } from "../../pages/reset-password";
import { ChangePassword } from "../../pages/change-password";
import { ProvideAuth } from "../../services/auth";
import { ProfilePage } from "../../pages/profile-page";
import { ProtectedRouteElement } from "../protected-route";
import { useLocation } from "react-router-dom";
import { Modal } from "../Modal/Modal";
import { IngredientDetails } from "../IngredientDetails/IngredientDetails";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { OrderModal } from "../OrderModal/OrderModal";
import { Feed } from "../../pages/feedpage";
import { OrderFullPage } from "../../pages/orderFullPage";
import { setModalEmpty } from "../../services/actions/getIngridients";
import { ProfileUserInfo } from "../ProfileUserInfo/ProfileUserInfo";
import { ProfileOrders } from "../ProfileOrders/ProfileOrders";
function Constructor() {
  return (
    <main className={styles.main}>
      <h1> Соберите Бургер</h1>
      <div className={styles.burgers}>
        <BurgerIngredients />
        <BurgerConstructor />
      </div>
    </main>
  );
}

function App() {
  const Orders = useSelector((store) => store.ws.orders);
  const profileOrders = useSelector((store) => store.ws.profileOrders);

  const navigate = useNavigate();
  const location = useLocation();
  const background = location.state && location.state.background;
  function onClose() {
    navigate(-1);
    dispatch(setModalEmpty());
  }
  const ws = useSelector((store) => store.ws);

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getItems());
  }, [dispatch]);

  return (
    <ProvideAuth>
      <div className={styles.app}>
        <Header />

        <DndProvider backend={HTML5Backend}>
          <Routes location={background || location}>
            <Route path="/" element={<Constructor />} />
            <Route
              path="/login"
              element={
                <ProtectedRouteElement
                  needsAuth={false}
                  element={<LoginPage />}
                />
              }
            />
            <Route
              path="/register"
              element={
                <ProtectedRouteElement
                  needsAuth={false}
                  element={<RegisterPage />}
                />
              }
            />
            <Route
              path="/forgot-password"
              element={
                <ProtectedRouteElement
                  needsAuth={false}
                  element={<ResetPassword />}
                />
              }
            />
            <Route
              path="/reset-password"
              element={
                <ProtectedRouteElement
                  needsAuth={false}
                  element={<ChangePassword />}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRouteElement
                  needsAuth={true}
                  element={<ProfilePage />}
                />
              }
            >
              <Route path="" element={<ProfileUserInfo />} />
              <Route path="orders" element={<ProfileOrders />} />
            </Route>
            <Route path="/feed" element={<Feed />} />
            <Route path="/ingredients/:id" element={<FullIngredientPage />} />
            <Route path="/feed/:number" element={<OrderFullPage />} />
            <Route path="/profile/orders/:number" element={<OrderFullPage />} />
          </Routes>
        </DndProvider>
        {background && (
          <Routes>
            <Route
              path="/ingredients/:id"
              element={
                <Modal onClose={onClose}>
                  <IngredientDetails />
                </Modal>
              }
            />
          </Routes>
        )}
        {background && Orders && (
          <Routes>
            <Route
              path="/feed/:number"
              element={
                <Modal onClose={onClose}>
                  <OrderModal data={Orders} />
                </Modal>
              }
            />
          </Routes>
        )}
        {background && profileOrders && (
          <Routes>
            <Route
              path="/profile/orders/:number"
              element={
                <Modal onClose={onClose}>
                  <OrderModal />
                </Modal>
              }
            />
          </Routes>
        )}
      </div>
    </ProvideAuth>
  );
}

export default App;
