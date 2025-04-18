import { useState } from "react";

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

function App() {
  const [currFriend, setCurrFriend] = useState(null);
  function handleCurrFriend(id) {
    setCurrFriend(id);
  }

  return (
    <div className="app">
      <FriendList
        initialFriends={initialFriends}
        currFriend={currFriend}
        onChangeFriend={handleCurrFriend}
      />
    </div>
  );
}
export default App;

function FriendList({ initialFriends, currFriend, onChangeFriend }) {
  return (
    <div className="sidebar">
      {initialFriends.map((friend) => (
        <Friend
          friend={friend}
          onChangeFriend={onChangeFriend}
          key={friend.id}
        />
      ))}
    </div>
  );
}

function Friend({ friend, onChangeFriend }) {
  const [owe, setOwe] = useState(0);
  const subText =
    owe === 0
      ? `You and ${friend.name} are Even`
      : owe > 0
      ? `${friend.name} owes you ${owe}`
      : `You owe ${friend.name} ${owe}`;
  return (
    <ul className="sidebar">
      <h3>{friend.id}</h3>
      {subText}
      <button className="button" onClick={() => onChangeFriend(friend.id)}>
        select
      </button>
    </ul>
  );
}

function NewFriendForm() {}

function billData() {}
