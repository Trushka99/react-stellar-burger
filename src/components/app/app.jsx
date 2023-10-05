import React from "react";
import styles from "./app.module.css";
import { Header } from "../header/header";
import { BurgerIngredients } from "../BurgerIngridients/BurgerIngredients";
import { BurgerConstructor } from "../BurgerConstructor/BurgerConstructor";
import { Api } from "../Api/api";
function App() {
  const [state, setState] = React.useState({ 
    data: []
  })
React.useEffect(() => {
    const getProductData = async () => {
      const data = await Api()
      setState({...state,data: data.data});
    }

    getProductData();
  }, [])
  return (
    <div className={styles.app}>
      <header>
        <Header/>
      </header>
      <main className={styles.main}>
      <h2 className='main_text'>Соберите бургер</h2>
        <div className={styles.burgers}>
      <BurgerIngredients  data={state.data} />
      <BurgerConstructor data={state.data}/>
      </div>
      </main>

    </div>
  );
}

export default App;
