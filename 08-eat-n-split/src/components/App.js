import "../index.css";
const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];
export default function App() {
  return (
    <div className="app">
      <FriendsList />
      <SplitBill />
    </div>
  );
}

function FriendsList() {
  return (
    <div className="sidebar">
      <ul>
        {initialFriends.map((friend) => (
          <Friend friend={friend} key={friend.id} />
        ))}
      </ul>

      <AddFriend></AddFriend>
    </div>
  );
}
function Friend({ friend }) {
  return (
    <li className={friend.balance > 0 ? "selected" : ""}>
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>

      {friend.balance > 0 && (
        <p className="green">
          {friend.name} owes you {friend.balance}€
        </p>
      )}
      {friend.balance < 0 && (
        <p className="red">
          You owe {friend.name} {-1 * friend.balance}€
        </p>
      )}
      {friend.balance === 0 && <p>You and {friend.name} are even</p>}

      <Button>{friend.balance > 0 ? "Close" : "Select"}</Button>
    </li>
  );
}

function AddFriend() {
  return (
    <>
      <form className="form-add-friend">
        <label>👯 Friend name:</label>
        <input type="text" />

        <label>🖼️ Image URL: </label>
        <input type="text" />

        <Button>ADD</Button>
      </form>
      <Button>close</Button>
    </>
  );
}

function SplitBill() {
  return (
    <form className="form-split-bill">
      <label>💸 Bill value:</label>
      <input type="text" />

      <label>🧍‍♀️ Your expense: </label>
      <input type="text" />

      <label>👯 Friend's expense:</label>
      <input type="text" disabled={true} />

      <label>😁 Who is paying the bill? </label>
      <select>
        <option>You</option>
        <option>Your Friend</option>
      </select>

      <Button>Split Bill</Button>
    </form>
  );
}

function Button({ children }) {
  return <button className="button">{children}</button>;
}
