import itemType from "../types";

interface statsProps {
    items: itemType[];
}

export default function Stats({ items }: statsProps ) {
  const numItems:number = items.length;
  const packedItems:number = items.filter((item:itemType) => item.packed).length;
  const percentage:number = Math.round((packedItems / numItems) * 100);

  if (!numItems)
    return (
      <footer className="stats">
        <em>Start adding some items to your list 🚀</em>
      </footer>
    );
  return (
    <footer className="stats">
      <em>
        {percentage === 100
          ? "You got every thing! Ready to go ✈️"
          : `🧳You have ${numItems} items on your list, and you already packed ${packedItems} (${percentage}%)`}
      </em>
    </footer>
  );
}
