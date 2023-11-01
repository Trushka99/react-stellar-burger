import React from "react";
import styles from "./app.module.css";
import { Header } from "../header/header";
import { BurgerIngredients } from "../BurgerIngridients/BurgerIngredients";
import { BurgerConstructor } from "../BurgerConstructor/BurgerConstructor";

function App() {
  return (
    <div className={styles.app}>
      <header>
        <Header />
      </header>
      <main className={styles.main}>
        <h2 className="main_text">Соберите бургер</h2>
        <div className={styles.burgers}>
          <BurgerIngredients />
          <BurgerConstructor />
        </div>
      </main>
    </div>
  );
}

export default App;
