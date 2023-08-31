import { Friend } from "./Friend";

export function FriendsList({ friends, onSelection, onSelectedFriend }) {
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
