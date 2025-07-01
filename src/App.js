import React, { useEffect, useState } from "react";
// import ReactDom from 'react-dom/client'
import "./App.css";

export default function App() {
const [isNotFilled, setIsNotFilled] = useState(false);
const [calculationValue, setCalculationValue] = useState({
      amount: "",
      term: "",
      interestRate: "",
      type: "",
  })
const [result, setResult] = useState(null);
const monthlyPay = result / calculationValue.term / 12;
const totalPay = result;

  function handleClear() {
    setResult(null);
    setIsNotFilled(false);
    setCalculationValue({
        amount: "",
        term: "",
        interestRate: "",
        type: ""
    })
  }
  useEffect(()=>{
    const handleKeyDown = (e)=>{
      if(e.key==="Escape"){
        handleClear();
      }
    };
    document.addEventListener("keydown",handleKeyDown)
},[])

  return (
    <div className="App">
      <div className="container">
        <div className="left">
          <header>
            <h2>Morgage Calculator</h2>
            <Button onClick={handleClear} className={"clear"}>
              ClearAll
            </Button>
          </header>
          <main>
            <Form
            setCalculationValue ={setCalculationValue}
            calculationValue={calculationValue}
              isNotFilled={isNotFilled}
              setIsNotFilled={setIsNotFilled}
              setResult={setResult}
            />
          </main>
        </div>
        <div className="right">
          <aside>
            <Result
              result={result}
              monthlyPay={monthlyPay}
              totalPay={totalPay}
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

function Button({ children, onClick, className, type }) {
  return (
    <button className={className} onClick={onClick} type={type}>
      {children}
    </button>
  );
}

function Form({
  setResult,
  isNotFilled, 
  setIsNotFilled,
  calculationValue,
  setCalculationValue,
}) {
  

  function handleSubmit(e) {
    e.preventDefault();
    if (calculationValue.term==="" || calculationValue.interestRate==="" || calculationValue.type==="" || calculationValue.amount===""){ 
      setIsNotFilled(true)
      return;
    };
    setIsNotFilled(false)

    if (calculationValue.type === "interestOnly") {
      setResult((calculationValue.interestRate * calculationValue.amount) / 100);
    }
    if (calculationValue.type === "repayment") {
      setResult(calculationValue.amount + (calculationValue.interestRate * calculationValue.amount) / 100);
    }
  }
  function handleInput(e){
    if(e.target.name !== "type"){
      setCalculationValue({
      ...calculationValue,
      [e.target.name]: Number(e.target.value)
    })
    return;
  }
      setCalculationValue({
      ...calculationValue,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="morgageAmt">
        <label htmlFor="morgageAmt">Morgage Amount</label>
          <p className={calculationValue.amount ? "input": isNotFilled && calculationValue.amount===""? "input borderError": "input"}>
            <b className={calculationValue.amount ? "": isNotFilled && calculationValue.amount===""?"backgroundError":""}>£</b>
            <input
              id="morgageAmt"
              name="amount"
              type="number"
              value={calculationValue.amount<0? -calculationValue.amount: ""+calculationValue.amount}
              onInput={handleInput}
              onBlur={()=> calculationValue.amount ===0? setCalculationValue({...calculationValue, amount:""}): calculationValue.amount}
              />
          </p>
          <p className={calculationValue.amount ? "none": isNotFilled && calculationValue.amount===""?"paragraphError":"none"}>This field is required</p>
      </div>
      
      <div className="termNinterest">
        <div className="termNrate">
          <label htmlFor="morgageTerm">Morgage Term</label>
          <p className={calculationValue.term ? "input": isNotFilled&&calculationValue.term ===""?"input borderError":"input"}>
            <input
              id="morgageTerm"
              type="number"
              name="term"
              value={calculationValue.term>=0 ? ""+calculationValue.term:''}
              onBlur={()=> calculationValue.term===0? setCalculationValue({...calculationValue, term:""}):calculationValue.term}
              onInput={handleInput}
            />
            <b className={calculationValue.term ? "": isNotFilled && calculationValue.term===""?"backgroundError": ""}>years</b>
          </p>
          <p className={isNotFilled&&calculationValue.interestRate && calculationValue.term?"none":isNotFilled && calculationValue.interestRate==="" && calculationValue.term? "none margin": isNotFilled && (calculationValue.term==="")?"paragraphError":"none" }>This field is required</p>
        </div>
        <div className="termNrate">
          <label htmlFor="interestRate">Interest Rate</label>
          <p className={calculationValue.interestRate ? "input": isNotFilled && calculationValue.interestRate===""? "input borderError": "input"}>
            <input
              id="interestRate"
              name="interestRate"
              type="number"
              value={calculationValue.interestRate<0? -calculationValue.interestRate: ""+calculationValue.interestRate}
              onInput={handleInput}
            />
            <b className={calculationValue.interestRate ? "": isNotFilled && calculationValue.interestRate===""? "backgroundError":""}>%</b>
          </p>
          <p className={isNotFilled&&calculationValue.interestRate && calculationValue.term?"none":isNotFilled && (calculationValue.interestRate|| calculationValue.interestRate===0) && calculationValue.term===""? "none margin": isNotFilled && calculationValue.interestRate===""? "paragraphError":"none"}>This field is required</p>
        </div>
      </div>

      <div className="morgageType">
        <label htmlFor="morgageType">Morgage Type</label>
        <div id="morgageType">
          <div className="repayment">
            <input
              type="radio"
              id="repayment"
              name="type"
              value="repayment"
              checked={calculationValue.type === "repayment"}
              onChange={handleInput}
            />
            <label htmlFor="repayment">Repayment</label>
          </div>

          <div className="interestOnly">
            <input
              type="radio"
              id="interestOnly"
              name="type"
              value="interestOnly"
              checked={calculationValue.type === "interestOnly"}
              onChange={handleInput}
            />
            <label htmlFor="interestOnly">Interest Only</label>
          </div>
          <p className={isNotFilled && calculationValue.type==="" ? "paragraphError": isNotFilled===false && calculationValue.type===""? "none":calculationValue.type?"none":"paragraphError"}>This field is required</p>
        </div>
      </div>
      <Button className={"repay"} type="submit" ><img src="./images/icon-calculator.svg" alt="" /> Calculate Repayments</Button>
    </form>
  );
}

function Result({ result, totalPay, monthlyPay }) {
  return (
    <div className={result === null? 'awaitresult':'result'}>
      {result !== null && (
        <div className="answer">
          <div className="context">
            <h3>Your results</h3>
            <p>
              Your results are shown below based on the information you provided.
              To adjust the results, edit the form and click “calculate
              repayments” again.
            </p>
          </div>
          <div className="calculatedresult">
            <div className="monthly">
              <label htmlFor="monthlyPay">Your monthly repayments</label>
              <input
                type="text"
                id="monthlyPay"
                value={`£${Math.round(monthlyPay* 100)/100}`}
                disabled
              />
            </div>
            <div className="hr"></div>
            <div className="total">
              <label htmlFor="totalPay">Total you'll repay over the term</label>
              <input type="text" id="totalPay" value={`£${totalPay}`} disabled />
            </div>
          </div>
        </div>
      )}
      {result === null && (
        <div className="emptyResult">
          <img src="./images/illustration-empty.svg" alt="" />
          <br />
          <h3>Results Shown Here</h3>
          <p>
            Complete the form and click “calculate repayments” to see what your
            monthly repayments would be.
          </p>
        </div>
      )}
    </div>
  );
}
