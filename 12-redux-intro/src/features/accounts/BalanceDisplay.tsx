import { useSelector } from "react-redux";
import { RootState } from "../../store";
import formatCurrency from "../../formatCurrency";

function BalanceDisplay() {
  const balance = useSelector((store: RootState) => store.account.balance);
  console.log(balance);
  return <div className="balance">{formatCurrency(balance)}</div>;
}

export default BalanceDisplay;
