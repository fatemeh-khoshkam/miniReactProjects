import { useState } from "react";
import { Button } from "./Button";
import {initialFriendType} from "../types/myTypes";

type addFriendProps = {
    onAddFriend: (friend:initialFriendType) => void
}

export function AddFriend({ onAddFriend } : addFriendProps) {
  const [name, setName] = useState<string>("");
  const [image, setImage] = useState<string>("https://i.pravatar.cc/48");

  const id:number = Number(crypto.randomUUID());

  function submitHandler(e:React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!name || !image) return alert("please fill the form in correct way :)");

    const newFriend: initialFriendType = {
      name,
      image: `${image}?=${id}`,
      id,
      balance: 0,
    };
    onAddFriend(newFriend);
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
