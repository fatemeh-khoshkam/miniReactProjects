import { useState } from "react";
import "./../index.css";
import Logo from "./Logo";
import Form from "./Form";
import PackingList from "./PackingList";
import Stats from "./Stats";
import itemType from '../types';

export default function App() {
  const [items, setItems] = useState<itemType[]>([]);

  function addItem(item:itemType):void {
    setItems((items) => [...items, item]);
  }

  function itemDeleteHandler(id:number):void {
    setItems((items) => items.filter((item) => item.id !== id));
  }

  function toggleItemHandler(id:number):void {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  function clearListHandler():void {
    const confirmed:boolean = window.confirm(
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
