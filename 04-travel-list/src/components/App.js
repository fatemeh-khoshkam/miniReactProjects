import { useState } from "react";
import "./../index.css";
import Logo from "./Logo";
import Form from "./Form";
import PackingList from "./PackingList";
import Stats from "./Stats";

export default function App() {
  const [items, setItems] = useState([]);

  function addItem(item) {
    setItems((items) => [...items, item]);
  }

  function itemDeleteHandler(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }

  function toggleItemHandler(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  function clearListHandler() {
    const confirmed = window.confirm(
      "Are you sure you want to delete all items ?"
    );
    if (confirmed) setItems((items) => items.splice(0, items.length));
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={addItem} />
      <PackingList
        items={items}
        onDeleteItem={itemDeleteHandler}
        onToggleItem={toggleItemHandler}
        onClearList={clearListHandler}
      />
      <Stats items={items} />
    </div>
  );
}
