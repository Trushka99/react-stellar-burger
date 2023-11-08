import React from "react";
import styles from "./app.module.css";
import { Header } from "../header/header";
import { BurgerIngredients } from "../BurgerIngridients/BurgerIngredients";
import { BurgerConstructor } from "../BurgerConstructor/BurgerConstructor";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { getItems } from "../../services/actions/getIngridients";
import { useDispatch } from "react-redux";

function App() {
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(getItems());
  }, [dispatch]);
  return (
    <div className={styles.app}>
      <Header />
      <main className={styles.main}>
        <DndProvider backend={HTML5Backend}>
          <h2 className="main_text">Соберите бургер</h2>
          <div className={styles.burgers}>
            <BurgerIngredients />
            <BurgerConstructor />
          </div>
        </DndProvider>
      </main>
    </div>
  );
}

export default App;
