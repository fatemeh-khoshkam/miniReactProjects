import { useState }  from "react";
import { Button } from "./Button";
import {initialFriendType} from "../types/myTypes";
import React from "react";

type SplitBillProps = {
    onSelected: initialFriendType;
    onSplitBill: (payed:number) => void
}

export function SplitBill({ onSelected, onSplitBill } : SplitBillProps) {
  const [bill, setBill] = useState<number>(0);
  const [paidByUser, setPaidByUser] = useState<number>(0);
  const [whoIsPayed, setWhoIsPayed] = useState<string>("you");
  const paidByFriend: number = bill ? bill - paidByUser : 0;

  function submitHandler(e:React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!bill || !paidByUser)
      return alert("please fill the form in correct way :)");

    let payed:number | null = whoIsPayed === "you" ? paidByFriend : -paidByUser
    onSplitBill(payed);
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
