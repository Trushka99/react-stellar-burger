import React from "react";
import styles from "./app.module.css";
import { Header } from "../header/header";
import { BurgerIngredients } from "../BurgerIngridients/BurgerIngredients";
import { BurgerConstructor } from "../BurgerConstructor/BurgerConstructor";
import { GetIngridients } from "../Api/api";

export const DataContext = React.createContext([]);
export const MooveContext = React.createContext([]);
export const PriceContext = React.createContext(0);
export const BunContext = React.createContext([]);
export const BunStatus = React.createContext(false);
function App() {
  const [data, setData] = React.useState([]);
  const [moved, setMove] = React.useState([]);
  const [price, setPrice] = React.useState(0);
  const [bun, setBun] = React.useState([]);
  const [bunStatus, setStatus] = React.useState(false);

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
          <MooveContext.Provider value={{ moved, setMove }}>
            <PriceContext.Provider value={{ price, setPrice }}>
              <BunContext.Provider value={{ bun, setBun }}>
                <BunStatus.Provider value={{ bunStatus, setStatus }}>
                  <h2 className="main_text">Соберите бургер</h2>
                  <div className={styles.burgers}>
                    <BurgerIngredients />
                    <BurgerConstructor data={data} />
                  </div>
                </BunStatus.Provider>
              </BunContext.Provider>
            </PriceContext.Provider>
          </MooveContext.Provider>
        </DataContext.Provider>
      </main>
    </div>
  );
}

export default App;
