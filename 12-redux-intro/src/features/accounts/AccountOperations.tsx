import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { deposit, payLoan, requestLoan, withdraw } from "./accountSlice";
import formatCurrency from "../../formatCurrency";

function AccountOperations() {
  const [depositAmount, setDepositAmount] = useState<number | null>(null);
  const [withdrawalAmount, setWithdrawalAmount] = useState<number | null>(null);
  const [loanAmount, setLoanAmount] = useState<number | null>(null);
  const [loanPurpose, setLoanPurpose] = useState<string>("");
  const [currency, setCurrency] = useState<string>("USD");

  const dispatch = useDispatch<AppDispatch>();
  const loan = useSelector((store: RootState) => store.account.loan);

  function handleDeposit() {
    if (!depositAmount) {
      alert("Deposit amount is required");
      return;
    }

    dispatch(deposit(depositAmount));
    setDepositAmount(null);
  }

  function handleWithdrawal() {
    if (!withdrawalAmount) {
      alert("Withdrawal is required");
      return;
    }

    dispatch(withdraw(withdrawalAmount));
    setWithdrawalAmount(null);
  }

  function handleRequestLoan() {
    if (!loanAmount || !loanPurpose) {
      alert("Fill the loan inputs correctly.");
      return;
    }

    dispatch(requestLoan(loanAmount, loanPurpose));
    setLoanAmount(null);
    setLoanPurpose("");
  }

  function handlePayLoan() {
    dispatch(payLoan());
  }

  return (
    <div>
      <h2>Your account operations</h2>
      <div className="inputs">
        <div>
          <label>Deposit</label>
          <input
            value={depositAmount || ""}
            type="number"
            onChange={(e) => setDepositAmount(Number(e.target.value))}
          />
          <select>
            <option value="USD">US Dollar</option>
            <option value="EUR">Euro</option>
            <option value="GBP">British Pound</option>
          </select>

          <button onClick={handleDeposit}>Deposit {depositAmount}</button>
        </div>

        <div>
          <label>Withdraw</label>
          <input
            type="number"
            value={withdrawalAmount || ""}
            onChange={(e) => setWithdrawalAmount(Number(e.target.value))}
          />
          <button onClick={handleWithdrawal}>
            Withdraw {withdrawalAmount}
          </button>
        </div>

        <div>
          <label>Request loan</label>
          <input
            type="number"
            placeholder="Loan amount"
            value={loanAmount || ""}
            onChange={(e) => setLoanAmount(Number(e.target.value))}
          />
          <input
            placeholder="Loan purpose"
            value={loanPurpose}
            onChange={(e) => setLoanPurpose(e.target.value)}
          />
          <button onClick={handleRequestLoan}>Request loan</button>
        </div>

        <div>
          <span>Pay back {formatCurrency(loan)}</span>

          <button onClick={handlePayLoan}>Pay loan</button>
        </div>
      </div>
    </div>
  );
}

export default AccountOperations;
