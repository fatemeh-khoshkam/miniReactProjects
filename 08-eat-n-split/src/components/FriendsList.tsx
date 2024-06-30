import { Friend } from "./Friend";
import { initialFriendType } from "../types/myTypes";

type friendListProps = {
    friends: initialFriendType[],
    onSelection: (friend: initialFriendType) => void,
    onSelectedFriend: initialFriendType | null
}

export function FriendsList({ friends, onSelection, onSelectedFriend } : friendListProps) {
  return (
    <div className="sidebar">
      <ul>
        {friends.map((friend:initialFriendType) => (
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
