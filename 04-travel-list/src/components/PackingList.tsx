import React, { useState } from "react";
import Item from "./Item";
import itemType from '../types';

interface packingListProps {
  items: itemType[];
  onDeleteItem: (id: number) => void,
  onToggleItem: (id: number) => void,
  onClearList: () => void,
}

export default function PackingList({
  items,
  onDeleteItem,
  onToggleItem,
  onClearList,
} : packingListProps) {

  const [sortBy, setSortBy] = useState<string>("input");
  let sortItems: itemType[] = items;

  if (sortBy === "input") sortItems = items;
  if (sortBy === "description")
    sortItems = items
      .slice()
      .sort((a:itemType, b:itemType) => a.description.localeCompare(b.description));
  if (sortBy === "packed")
    sortItems = items
      .slice()
      .sort((a:itemType, b:itemType) => Number(a.packed) - Number(b.packed));

  return (
    <div className="list">
      <ul>
        {sortItems.map((item:itemType, i:number) => (
          <Item
            item={item}
            key={i}
            onToggleItem={onToggleItem}
            onDeleteItem={onDeleteItem}
          />
        ))}
      </ul>

      <div className="actions">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="input">Sort by input order</option>
          <option value="description">Sort by description</option>
          <option value="packed">Sort by packed status</option>
        </select>
        <button onClick={onClearList}>Clear list</button>
      </div>
    </div>
  );
}
