import { useState } from "react";
import { useDispatch } from "react-redux";
import { createCustomer } from "../customers/customerSlice";
import { AppDispatch } from "../../store";

function Customer() {
  const [fullName, setFullName] = useState<string>("");
  const [nationalId, setNationalId] = useState<string>("");

  const dispatch = useDispatch<AppDispatch>();

  function handleClick() {
    if (fullName === "" || nationalId === "") {
      alert(`You have entered a full name and national ID.`);
      return;
    }
    dispatch(createCustomer(fullName, nationalId));
  }

  return (
    <div>
      <h2>Create new customer</h2>
      <div className="inputs">
        <div>
          <label>Customer full name</label>
          <input
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>
        <div>
          <label>National ID</label>
          <input
            value={nationalId}
            onChange={(e) => setNationalId(e.target.value)}
          />
        </div>
        <button onClick={handleClick}>Create new customer</button>
      </div>
    </div>
  );
}

export default Customer;
