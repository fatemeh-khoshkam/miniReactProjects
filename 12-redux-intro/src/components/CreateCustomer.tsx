import { useState } from "react";

function Customer() {
  const [fullName, setFullName] = useState<string>("");
  const [nationalId, setNationalId] = useState<string>("");

  function handleClick() {}

  return (
    <div>
      <h2>Create new customer</h2>
      <div className="inputs">
        <div>
          <label>Customer full name</label>
          <input />
        </div>
        <div>
          <label>National ID</label>
          <input />
        </div>
        <button onClick={handleClick}>Create new customer</button>
      </div>
    </div>
  );
}

export default Customer;
