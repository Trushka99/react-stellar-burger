import React from "react";
import styles from "./app.module.css";
import { Header } from "../header/header";
import { BurgerIngredients } from "../BurgerIngridients/BurgerIngredients";
import { BurgerConstructor } from "../BurgerConstructor/BurgerConstructor";
import { Api } from "../Api/api";
function App() {
  const [state, setState] = React.useState({
    data: [],
    total: 400,
  });
  React.useEffect(() => {
    const getProductData = async () => {
      const data = await Api();
      data.data.forEach((element) => {
        let total = state.total + element.price;
        setState({ ...state, data: data.data, total: total + element.price });
      });
    };

    getProductData();
  }, []);
  return (
    <div className={styles.app}>
      <header>
        <Header />
      </header>
      <main className={styles.main}>
        <h2 className="main_text">Соберите бургер</h2>
        <div className={styles.burgers}>
          <BurgerIngredients data={state.data} />
          <BurgerConstructor total={state.total} data={state.data} />
        </div>
      </main>
    </div>
  );
}

export default App;
