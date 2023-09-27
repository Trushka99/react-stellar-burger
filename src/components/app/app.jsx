import styles from "./app.module.css";
import { data } from "../../utils/data";
import { Header } from "../header/header";
import { BurgerIngredients } from "../BurgerIngridients/BurgerIngredients";
import { BurgerConstructor } from "../BurgerConstructor/BurgerConstructor";
function App() {
  return (
    <div className={styles.app}>
      <header>
        <Header/>
      </header>
      <main className={styles.main}>
      <h2 className='main_text'>Соберите бургер</h2>
        <div style={{ display: "flex", flexDirection: "row", gap:'40px'}}>
      <BurgerIngredients data={data} />
      <BurgerConstructor data={data}/>
      </div>
      </main>
    </div>
  );
}

export default App;
