import  itemType  from '../types'

interface itemProps {
    item: itemType,
    onDeleteItem: (id: number) => void,
    onToggleItem: (id: number) => void
}

export default function Item({ item, onDeleteItem, onToggleItem } : itemProps) {
  return (
    <li>
      <input
        key={item.id}
        type="checkbox"
        checked={item.packed}
        onChange={() => onToggleItem(item.id)}
      />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => onDeleteItem(item.id)}>❌</button>
    </li>
  );
}
