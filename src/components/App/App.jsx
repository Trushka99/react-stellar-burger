import React from "react";
import styles from "./App.module.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
  const location = useLocation();
  const previousLocation = location.state?.previousLocation;
  function onClose() {
    navigate(-1);
  }
  const [state, setState] = useState(true);
  const modalIners = useSelector((store) => store.Ingredients.ingModal);
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(getItems());
  }, [dispatch]);

  return (
    <ProvideAuth>
      <div className={styles.app}>
        <Header />

        <DndProvider backend={HTML5Backend}>
          <Routes location={previousLocation || location}>
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
            />
            <Route path="*" element={<Constructor />} />
            <Route path="/ingredients/:id" element={<FullIngredientPage />} />
          </Routes>
        </DndProvider>
        {previousLocation && (
          <Routes>
            <Route
              path="/ingredients/:id"
              element={
                <Modal onClose={onClose}>
                  <IngredientDetails/>
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
