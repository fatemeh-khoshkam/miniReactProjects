import { useState } from "react";
import "../index.css";
import { Button } from "./Button";
import { SplitBill } from "./SplitBill";
import { AddFriend } from "./AddFriend";
import { FriendsList } from "./FriendsList";

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
