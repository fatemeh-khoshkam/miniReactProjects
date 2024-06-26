import { useState } from "react";
import itemType from "../types";

interface formProps {
    onAddItems: (item: itemType) => void
}

export default function Form({ onAddItems } : formProps) {
  const [description, setDescription] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);


  function submitHandler(e:React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!description) return alert("Please fill the item input :)");

    const newItem:itemType = {
      quantity,
      description,
      packed: false,
      id: Math.floor(Math.random() * 100 + 1),
    };
    onAddItems(newItem);
    setDescription("");
    setQuantity(1);
  }

  return (
    <form className="add-form" onSubmit={submitHandler}>
      <h3>What do you need for your trip? 😍</h3>
      <select
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option key={num}>{num}</option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Item ..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></input>
      <button>Add</button>
    </form>
  );
}
