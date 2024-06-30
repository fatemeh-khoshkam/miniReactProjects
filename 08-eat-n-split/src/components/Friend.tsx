import { Button } from "./Button";
import {initialFriendType} from "../types/myTypes";

type friendListProps = {
    friend: initialFriendType,
    onSelection: (friend: initialFriendType) => void,
    onSelectedFriend: initialFriendType | null
}

export function Friend({ friend, onSelection, onSelectedFriend } : friendListProps) {
  const isSelected:boolean = onSelectedFriend?.id === friend.id;

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
