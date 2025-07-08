import React from "react";
import Button from "./Button";

function Form({
  setResult, isNotFilled, setIsNotFilled, calculationValue, setCalculationValue,
}) {
  function handleSubmit(e) {
    e.preventDefault();
    if (calculationValue.term === "" ||
      calculationValue.interestRate === "" ||
      calculationValue.type === "" ||
      calculationValue.amount === "") {
      setIsNotFilled(true);
      return;
    }
    setIsNotFilled(false);
    const monthPerYear = 12;
    const parseAmount = parseFloat(calculationValue.amount.replace(/,/g, ""));
    const monthlyInterest = Number(calculationValue.interestRate) / (monthPerYear * 100);
    const term = Number(calculationValue.term.replace(/,/g, ""));
    const numberOfMonths = term * monthPerYear;
    const monthlyPayment = (parseAmount *
      (monthlyInterest * Math.pow(1 + monthlyInterest, numberOfMonths))) /
      (Math.pow(1 + monthlyInterest, numberOfMonths) - 1);
    let computedResult;
    if (calculationValue.type === "interestOnly") {
      computedResult = monthlyPayment * numberOfMonths - parseAmount;

      setResult(computedResult);
    }
    if (calculationValue.type === "repayment") {
      computedResult = monthlyPayment * numberOfMonths;
      setResult(computedResult);
    }
    setCalculationValue({
      ...calculationValue,
      monthlyPay: computedResult / (term * monthPerYear),
    });
  }

  function handleInput(e) {
    const rawValue = e.target.value.replace(/,/g, ""); // Remove existing commas
    const numberValue = parseFloat(rawValue);
    console.log(isNaN(numberValue));
    const formattedValue = new Intl.NumberFormat("en-US").format(numberValue);
    const isValidInterest = /^\d*\.?\d{0,2}$/.test(rawValue);
    const isValidTerm = /^[0-9]*$/.test(rawValue);
    if (e.target.name === "amount") {
      setCalculationValue({
        ...calculationValue,
        [e.target.name]: formattedValue,
      });
      return;
    }
    if (isValidInterest) {
      if (e.target.name === "interestRate") {
        setCalculationValue({
          ...calculationValue,
          [e.target.name]: rawValue,
        });
      }
    }
    if (isValidTerm) {
      if (e.target.name === "term") {
        setCalculationValue({
          ...calculationValue,
          [e.target.name]: new Intl.NumberFormat("en-US").format(
            Number(rawValue)
          ),
        });
      }
    }
    if (e.target.name === "type") {
      setCalculationValue({
        ...calculationValue,
        [e.target.name]: e.target.value,
      });
    }
  }
  return (
    <form onSubmit={handleSubmit}>
      <div className="morgageAmt">
        <label htmlFor="morgageAmt">Morgage Amount</label>
        <p
          className={calculationValue.amount
            ? "input"
            : isNotFilled && calculationValue.amount === ""
              ? "input borderError"
              : "input"}
        >
          <b
            className={calculationValue.amount
              ? "amountlogo"
              : isNotFilled && calculationValue.amount === ""
                ? "backgroundError"
                : "amountlogo"}
          >
            £
          </b>
          <input
            id="morgageAmt"
            name="amount"
            type="text"
            value={calculationValue.amount === "NaN" ? setCalculationValue({...calculationValue, amount: ""}) : calculationValue.amount}
            onInput={handleInput}
            onBlur={() => calculationValue.amount === "0"
              ? setCalculationValue({ ...calculationValue, amount: "" })
              : calculationValue.amount} />
        </p>
        <p
          className={calculationValue.amount
            ? "none"
            : isNotFilled && calculationValue.amount === ""
              ? "paragraphError"
              : "none"}
        >
          This field is required
        </p>
      </div>

      <div className="termNinterest">
        <div className="termNrate">
          <label htmlFor="morgageTerm">Morgage Term</label>
          <p
            className={calculationValue.term
              ? "input"
              : isNotFilled && calculationValue.term === ""
                ? "input borderError"
                : "input"}
          >
            <input
              id="morgageTerm"
              type="text"
              name="term"
              value={calculationValue.term === "0" ? setCalculationValue({ ...calculationValue, term: "" }) : calculationValue.term}

              onInput={handleInput} />
            <b
              className={calculationValue.term !== ""
                ? "termlogo"
                : isNotFilled && calculationValue.term === ""
                  ? "backgroundError"
                  : "termlogo"}
            >
              years
            </b>
          </p>
          <p
            className={isNotFilled &&
              calculationValue.interestRate &&
              calculationValue.term
              ? "none"
              : isNotFilled &&
                calculationValue.interestRate === "" &&
                calculationValue.term
                ? "none margin"
                : isNotFilled && calculationValue.term === ""
                  ? "paragraphError"
                  : "none"}
          >
            This field is required
          </p>
        </div>
        <div className="termNrate">
          <label htmlFor="interestRate">Interest Rate</label>
          <p
            className={calculationValue.interestRate
              ? "input"
              : isNotFilled && calculationValue.interestRate === ""
                ? "input borderError"
                : "input"}
          >
            <input
              id="interestRate"
              name="interestRate"
              type="text"
              value={calculationValue.interestRate}
              onInput={handleInput}
              onBlur={() => calculationValue.interestRate === "0" ? setCalculationValue({ ...calculationValue, interestRate: "" }) : calculationValue.interestRate} />
            <b
              className={calculationValue.interestRate
                ? "interestlogo"
                : isNotFilled && calculationValue.interestRate === ""
                  ? "backgroundError"
                  : "interestlogo"}
            >
              %
            </b>
          </p>
          <p
            className={isNotFilled &&
              calculationValue.interestRate &&
              calculationValue.term
              ? "none"
              : isNotFilled &&
                (calculationValue.interestRate ||
                  calculationValue.interestRate === 0) &&
                calculationValue.term === ""
                ? "none margin"
                : isNotFilled && calculationValue.interestRate === ""
                  ? "paragraphError"
                  : "none"}
          >
            This field is required
          </p>
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
              onChange={handleInput} />
            <label htmlFor="repayment">Repayment</label>
          </div>

          <div className="interestOnly">
            <input
              type="radio"
              id="interestOnly"
              name="type"
              value="interestOnly"
              checked={calculationValue.type === "interestOnly"}
              onChange={handleInput} />
            <label htmlFor="interestOnly">Interest Only</label>
          </div>
          <p
            className={isNotFilled && calculationValue.type === ""
              ? "paragraphError"
              : isNotFilled === false && calculationValue.type === ""
                ? "none"
                : calculationValue.type
                  ? "none"
                  : "paragraphError"}
          >
            This field is required
          </p>
        </div>
      </div>
      <Button className={"repay"} type="submit">
        <img src="./images/icon-calculator.svg" alt="" /> Calculate Repayments
      </Button>
    </form>
  );
}
export default Form
