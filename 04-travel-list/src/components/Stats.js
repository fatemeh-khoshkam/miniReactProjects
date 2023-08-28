export default function Stats({ items }) {
  const numItems = items.length;
  const packedItems = items.filter((item) => item.packed).length;
  const percentage = Math.round((packedItems / numItems) * 100);

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
