import React from "react";

function Result({ result, totalPay, calculationValue }) {
  return (
    <div className={result === null ? "awaitresult" : "result"}>
      {result !== null && (
        <div className="answer">
          <div className="context">
            <h3>Your results</h3>
            <p>
              Your results are shown below based on the information you
              provided. To adjust the results, edit the form and click
              “calculate repayments” again.
            </p>
          </div>
          <div className="calculatedresult">
            <div className="monthly">
              <label htmlFor="monthlyPay">Your monthly repayments</label>
              <input
                type="text"
                id="monthlyPay"
                value={`£ ${new Intl.NumberFormat("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }).format(calculationValue.monthlyPay)}`}
                disabled />
            </div>
            <div className="hr"></div>
            <div className="total">
              <label htmlFor="totalPay">Total you'll repay over the term</label>
              <input
                type="text"
                id="totalPay"
                value={`£ ${new Intl.NumberFormat("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }).format(totalPay)}`}
                disabled />
            </div>
          </div>
        </div>
      )}
      {result === null && (
        <div className="emptyResult">
          <img src="./images/illustration-empty.svg" alt="Empty" />
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

export default Result