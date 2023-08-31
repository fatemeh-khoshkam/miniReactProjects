import { useState } from "react";
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
  const [friend, setFriend] = useState(initialFriends);
  const [selection, setSelection] = useState(null);
  const [showAddFriend, setShowAddFriend] = useState(false);

  function addFriendToggle() {
    setShowAddFriend((state) => !state);
  }
  function addFriend(friend) {
    setFriend((friends) => [...friends, friend]);
    setShowAddFriend(false);
  }

  function selectionHandler(friend) {
    setSelection((curFriend) => (curFriend?.id === friend.id ? null : friend));
    setShowAddFriend(false);
  }

  function splitBill(payed) {
    setFriend((friends) =>
      friends.map((friend) =>
        friend.id === selection.id
          ? { ...friend, balance: friend.balance + payed }
          : friend
      )
    );

    setSelection(null);
  }

  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList
          friends={friend}
          onAddFriend={addFriend}
          onSelection={selectionHandler}
          onSelectedFriend={selection}
        />

        {showAddFriend && <AddFriend onAddFriend={addFriend}></AddFriend>}

        <Button onClick={addFriendToggle}>
          {showAddFriend ? "Close" : "Add Friend"}
        </Button>
      </div>
      {selection && (
        <SplitBill
          onSelected={selection}
          onSplitBill={splitBill}
          key={selection.id}
        />
      )}
    </div>
  );
}

function FriendsList({ friends, onSelection, onSelectedFriend }) {
  return (
    <div className="sidebar">
      <ul>
        {friends.map((friend) => (
          <Friend
            friend={friend}
            key={friend.id}
            onSelection={onSelection}
            onSelectedFriend={onSelectedFriend}
          />
        ))}
      </ul>
    </div>
  );
}

function Friend({ friend, onSelection, onSelectedFriend }) {
  const isSelected = onSelectedFriend?.id === friend.id;

  return (
    <li className={isSelected ? "selected" : ""}>
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>

      {friend.balance < 0 && (
        <p className="red">
          You owe {friend.name} {Math.abs(friend.balance)}€
        </p>
      )}

      {friend.balance > 0 && (
        <p className="green">
          {friend.name} owes you {Math.abs(friend.balance)}€
        </p>
      )}

      {friend.balance === 0 && <p>You and {friend.name} are even</p>}

      <Button onClick={() => onSelection(friend)}>
        {isSelected ? "Close" : "Select"}
      </Button>
    </li>
  );
}

function AddFriend({ onAddFriend }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc/48");

  const id = crypto.randomUUID();

  function submitHandler(e) {
    e.preventDefault();

    if (!name || !image) return alert("please fill the form in correct way :)");

    const newFreiend = {
      name,
      image: `${image}?=${id}`,
      id,
      balance: 0,
    };
    onAddFriend(newFreiend);
    setName("");
    setImage("https://i.pravatar.cc/48");
  }

  return (
    <form className="form-add-friend" onSubmit={submitHandler}>
      <label>👯 Friend name:</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <label>🖼️ Image URL: </label>
      <input
        type="text"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />

      <Button>ADD</Button>
    </form>
  );
}

function SplitBill({ onSelected, onSplitBill }) {
  const [bill, setBill] = useState("");
  const [paidByUser, setPaidByUser] = useState("");
  const [whoIsPayed, setWhoIsPayed] = useState("you");
  const paidByFriend = bill ? bill - paidByUser : "";

  function submitHandler(e) {
    e.preventDefault();

    if (!bill || !paidByUser)
      return alert("please fill the form in correct way :)");

    onSplitBill(whoIsPayed === "you" ? paidByFriend : -paidByUser);
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

function Button({ children, onClick }) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}
