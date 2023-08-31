import { useState } from "react";
import { Button } from "./Button";

export function SplitBill({ onSelected, onSplitBill }) {
  const [bill, setBill] = useState("");
  const [paidByUser, setPaidByUser] = useState("");
  const [whoIsPayed, setWhoIsPayed] = useState("you");
  const paidByFriend = bill ? bill - paidByUser : "";

  function submitHandler(e) {
    e.preventDefault();

    if (!bill || !paidByUser)
      return alert("please fill the form in correct way :)");

    onSplitBill(whoIsPayed === "you" ? paidByFriend : -paidByUser);
    console.log(onSelected.balance);
  }

  return (
    <form className="form-split-bill" onSubmit={submitHandler}>
      <h2>Split a bill with {onSelected.name}</h2>

      <label>💸 Bill value:</label>
      <input
        type="text"
        value={bill}
        onChange={(e) => setBill(Number(e.target.value))}
      />

      <label>🧍‍♀️ Your expense: </label>
      <input
        type="text"
        value={paidByUser}
        onChange={(e) =>
          setPaidByUser(
            Number(e.target.value) > bill ? paidByUser : Number(e.target.value)
          )
        }
      />

      <label>👯 {onSelected.name}'s expense:</label>
      <input type="text" disabled={true} value={paidByFriend} />

      <label>😁 Who is paying the bill? </label>
      <select
        value={whoIsPayed}
        onChange={(e) => setWhoIsPayed(e.target.value)}
      >
        <option value="you">You</option>
        <option value="friend">{onSelected.name}</option>
      </select>

      <Button>Split Bill</Button>
    </form>
  );
}
