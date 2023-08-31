import { useState } from "react";
import { Button } from "./Button";

export function AddFriend({ onAddFriend }) {
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
