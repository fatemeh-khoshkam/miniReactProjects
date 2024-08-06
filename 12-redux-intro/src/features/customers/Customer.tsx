import { useSelector } from "react-redux";
import { RootState } from "../../store";

function Customer() {
  const fullName = useSelector((store: RootState) => store.customer.fullName);
  console.log(fullName);

  return <h2>👋 Welcome, {fullName}</h2>;
}

export default Customer;
