import styles from "./App.module.css";
import poweredImage from "./assets/powered.png";
import { useState } from "react";
import { GridItem } from "./components/GridItem";
import { levels, calculateImc, Level } from "./helpers/imc";
import leftArrowImage from './assets/leftarrow.png';

function App() {
  const [heightField, setHeightField] = useState<number>(0);
  const [weightField, setWeightField] = useState<number>(0);
  const [toShow, setToShow] = useState<Level | null>(null);

  const handleClick = () => {
    if (heightField && weightField) {
      setToShow(calculateImc(heightField, weightField));
    } else {
      console.log("Não deu!");
    }
  };

const handleBackButton = ()=>{
  setToShow(null)
  setWeightField(0)
  setHeightField(0)
}

  return (
    <div className={styles.main}>
      <header className={styles.headerContainer}>
        <img src={poweredImage} alt="" width={150} />
      </header>
      <div className={styles.container}>
        <div className={styles.leftSide}>
          <h1>Calcule o seu IMC</h1>
          <p>
            Criado no século 19 pelo matemático Lambert Quételet, o Índice de
            Massa Corporal, conhecido pela sigla IMC, é um cálculo simples que
            permite medir se alguém está ou não com o peso ideal. Ele aponta se
            o peso está adequado ou se está abaixo ou acima do peso.
          </p>
          <input
            type="number"
            placeholder="Digite a sua altura em centrimetros - Ex 1,60"
            value={heightField > 0 ? heightField : ""}
            onChange={(e) => setHeightField(parseFloat(e.target.value))}
            disabled={toShow ? true:false}
          />

          <input
            type="number"
            placeholder="Digite seu peso em kg -Ex 75"
            value={weightField > 0 ? weightField : ""}
            onChange={(e) => setWeightField(parseFloat(e.target.value))}
            disabled={toShow? true:false}
          />

          <button onClick={handleClick} disabled={toShow ? true:false}>Calcular</button>
        </div>

        <div className={styles.rightSide}>
          {!toShow && (
            <div className={styles.grid}>
              {levels.map((item, key) => (
                <GridItem key={key} item={item} />
              ))}
            </div>
          )}

          {toShow && (
            <div className={styles.rightBig}>
              <div className={styles.rightArrow} onClick={handleBackButton}>
                <img src={leftArrowImage} alt="" width={25} />
              </div>
              <GridItem item={toShow} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
