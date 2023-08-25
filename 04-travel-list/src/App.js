import { useState } from "react";
import "./index.css";

const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: false },
];

export default function App() {
  return (
    <div className="app">
      <Logo />
      <Form />
      <PackingList />
      <Stats />
    </div>
  );
}

function Logo() {
  return <h1>🌴🏜️ Far Away 🧳</h1>;
}
function Form() {
  const [description, setDescriptuion] = useState("");
  const [itemNum, setItemNum] = useState(1);

  function submitHandler(e) {
    e.preventDefault();

    if (!description) alert("Please fill the description !");

    setDescriptuion("");
    setItemNum(1);
  }

  return (
    <form className="add-form" onSubmit={submitHandler}>
      <h3>What do you need for your trip? 😍</h3>
      <select
        value={itemNum}
        onChange={(e) => {
          console.log(e.target);
          setItemNum(Number(e.target.value));
        }}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((number) => (
          <option value={number} key={number}>
            {number}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Item ..."
        value={description}
        onChange={(e) => setDescriptuion(e.target.value)}
      ></input>
      <button>Add</button>
    </form>
  );
}
function PackingList() {
  return (
    <div className="list">
      <ul>
        {initialItems.map((item) => (
          <Item item={item} key={item.id} />
        ))}
      </ul>
    </div>
  );
}
function Item({ item }) {
  return (
    <li>
      <span>
        {item.quantity} {item.description}
      </span>
      <button>❌</button>
    </li>
  );
}
function Stats() {
  return (
    <footer className="stats">
      <em>🧳You have X items on your list, and you already packed X</em>
    </footer>
  );
}
