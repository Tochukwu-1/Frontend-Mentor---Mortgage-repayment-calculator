import React, { useEffect, useState } from "react";
// import ReactDom from 'react-dom/client'
import "./App.css";

export default function App() {
const [isNotFilled, setIsNotFilled] = useState(false);

  const [amount, setAmount] = useState("");
  const [term, setTerm] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [type, setType] = useState("");
  const [result, setResult] = useState(null);
  const monthlyPay = result / term / 12;
  const totalPay = result;

  function handleClear() {
    setAmount("");
    setTerm("");
    setInterestRate("");
    setType("");
    setResult(null);
    setIsNotFilled(false);
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
              amount={amount}
              term={term}
              interestRate={interestRate}
              type={type}
              isNotFilled={isNotFilled}
              setAmount={setAmount}
              setTerm={setTerm}
              setInterestRate={setInterestRate}
              setType={setType}
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
  amount,
  term,
  interestRate,
  type,
  setAmount,
  setTerm,
  setInterestRate,
  setType,
  setResult,
  isNotFilled, 
  setIsNotFilled,
}) {
  

  function handleSubmit(e) {
    e.preventDefault();
    if (term==="" || interestRate==="" || type==="" || !amount){ 
      setIsNotFilled(true)
      return;
    };
    setIsNotFilled(false)

    if (type === "interestOnly") {
      setResult((interestRate * amount) / 100);
    }
    if (type === "repayment") {
      setResult(amount + (interestRate * amount) / 100);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="morgageAmt">
        <label htmlFor="morgageAmt">Morgage Amount</label>
          <p className={amount ? "input": isNotFilled && amount===""? "input borderError": "input"}>
            <b className={amount ? "": isNotFilled && amount===""?"backgroundError":""}>£</b>
            <input
              id="morgageAmt"
              type="number"
              value={amount}
              onInput={(e) => setAmount(Number(e.target.value))}
              />
          </p>
          <p className={amount ? "none": isNotFilled && amount===""?"paragraphError":"none"}>This field is required</p>
      </div>
      
      <div className="termNinterest">
        <div className="termNrate">
          <label htmlFor="morgageTerm">Morgage Term</label>
          <p className={term ? "input": isNotFilled&&term ===""?"input borderError":"input"}>
            <input
              id="morgageTerm"
              type="number"
              value={term>=0 ? ""+term:''}
              onBlur={()=>setTerm(term===0? "":term)}
              onInput={(e) => setTerm(Number(e.target.value))}
            />
            <b className={term ? "": isNotFilled && term===""?"backgroundError": ""}>years</b>
          </p>
          <p className={isNotFilled&&interestRate && term?"none":isNotFilled && interestRate==="" && term? "none margin": isNotFilled && (term==="")?"paragraphError":"none" }>This field is required</p>
       </div>
       {/* (isNotFilled && term && interestRate) || (isNotFilled!==true && term && interestRate!==true) || (isNotFilled!==true && term && interestRate) */}
        <div className="termNrate">
          <label htmlFor="interestRate">Interest Rate</label>
          <p className={interestRate ? "input": isNotFilled && interestRate===""? "input borderError": "input"}>
            <input
              id="interestRate"
              type="number"
              value={interestRate<0? -interestRate: ""+interestRate}
              onInput={(e) => setInterestRate(Number(e.target.value))}
            />
            <b className={interestRate ? "": isNotFilled && interestRate===""? "backgroundError":""}>%</b>
          </p>
          <p className={isNotFilled&&interestRate && term?"none":isNotFilled && (interestRate|| interestRate===0) && term===""? "none margin": isNotFilled && interestRate===""? "paragraphError":"none"}>This field is required</p>
        </div>
      </div>

      <div className="morgageType">
        <label htmlFor="morgageType">Morgage Type</label>
        <div id="morgageType">
          <div className="repayment">
            <input
              type="radio"
              id="repayment"
              name="morgageType"
              value="repayment"
              checked={type === "repayment"}
              onChange={(e) => setType(e.target.value)}
            />
            <label htmlFor="repayment">Repayment</label>
          </div>

          <div className="interestOnly">
            <input
              type="radio"
              id="interestOnly"
              name="morgageType"
              value="interestOnly"
              checked={type === "interestOnly"}
              onChange={(e) => setType(e.target.value)}
            />
            <label htmlFor="interestOnly">Interest Only</label>
          </div>
          <p className={isNotFilled && type==="" ? "paragraphError": isNotFilled===false && type===""? "none":type?"none":"paragraphError"}>This field is required</p>
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
          <div className="calculatedresult ">
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
