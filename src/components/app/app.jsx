import React from "react";
import styles from "./app.module.css";
import { Header } from "../header/header";
import { BurgerIngredients } from "../BurgerIngridients/BurgerIngredients";
import { BurgerConstructor } from "../BurgerConstructor/BurgerConstructor";
import { GetIngridients } from "../Api/api";
import { DataContext } from "../../services/Stellar-burger-contex";
import { MoveContext } from "../../services/Stellar-burger-contex";
import { PriceContext } from "../../services/Stellar-burger-contex";
import { BunStatus } from "../../services/Stellar-burger-contex";
import { SeparateIngContext } from "../../services/Stellar-burger-contex";
function App() {
  const [data, setData] = React.useState([]);
  const [moved, setMove] = React.useState([]);
  const [price, setPrice] = React.useState(0);
  const [bunStatus, setStatus] = React.useState(false);
  const [ing, setIng] = React.useState({ bun: [], ingredients: [] });

  React.useEffect(() => {
    GetIngridients()
      .then((res) => {
        if (res && res.success) {
          setData(res.data);
          // console.log(res.data)
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className={styles.app}>
      <header>
        <Header />
      </header>
      <main className={styles.main}>
        <DataContext.Provider value={{ data, setData }}>
          <MoveContext.Provider value={{ moved, setMove }}>
            <PriceContext.Provider value={{ price, setPrice }}>
              <BunStatus.Provider value={{ bunStatus, setStatus }}>
                <SeparateIngContext.Provider value={{ ing, setIng }}>
                  <h2 className="main_text">Соберите бургер</h2>
                  <div className={styles.burgers}>
                    <BurgerIngredients />
                    <BurgerConstructor data={data} />
                  </div>
                </SeparateIngContext.Provider>
              </BunStatus.Provider>
            </PriceContext.Provider>
          </MoveContext.Provider>
        </DataContext.Provider>
      </main>
    </div>
  );
}

export default App;
