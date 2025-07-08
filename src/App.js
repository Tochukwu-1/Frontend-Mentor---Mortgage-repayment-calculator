import React, { useEffect, useState } from "react";
import "./App.css";
import Form  from "./Form";
import Result from "./Result";
import Button from "./Button";

 function App() {
  const [result, setResult] = useState(null);
  const [isNotFilled, setIsNotFilled] = useState(false);
  const [calculationValue, setCalculationValue] = useState({
    amount: "",
    term: "",
    interestRate: "",
    type: "",
    monthlyPay: "",
  });

  function handleClear() {
    setResult(null);
    setIsNotFilled(false);
    setCalculationValue({
      amount: "",
      term: "",
      interestRate: "",
      type: "",
    });
  }
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        handleClear();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="App">
      <div className="container">
        <div className="left">
          <header>
            <h2>Mortgage Calculator</h2>
            <Button onClick={handleClear} className={"clear"}>
              ClearAll
            </Button>
          </header>
          <main>
            <Form
              setCalculationValue={setCalculationValue}
              calculationValue={calculationValue}
              isNotFilled={isNotFilled}
              setIsNotFilled={setIsNotFilled}
              setResult={setResult}
              result={result}
            />
          </main>
        </div>
        <div className="right">
          <aside>
            <Result
              result={result}
              calculationValue={calculationValue}
              totalPay={result}
            />
          </aside>
        </div>
      </div>
      <footer>
        <div class="attribution">
          Challenge by{" "}
          <a href="https://www.frontendmentor.io?ref=challenge">
            Frontend Mentor
          </a>
          . Coded by <a href="#me">Asogwa Tochukwu Gabriel</a>.
        </div>
      </footer>
    </div>
  );
}

export default App
