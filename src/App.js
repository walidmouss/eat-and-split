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
      {currFriend && <BillData />}
    </div>
  );
}
export default App;

function FriendList({ initialFriends, currFriend, onChangeFriend }) {
  const [FormOpen, setFormOpen] = useState(false);

  function handleAddNewFriend(S) {}

  function handleAddFriend() {
    NewFriendForm(handleAddNewFriend);
    setFormOpen(true);
  }
  return (
    <div className="sidebar">
      {initialFriends.map((friend) => (
        <ul>
          <Friend
            friend={friend}
            onChangeFriend={onChangeFriend}
            key={friend.id}
          />
        </ul>
      ))}
      {FormOpen ? (
        <NewFriendForm onAddNewFriend={handleAddNewFriend} />
      ) : (
        <button className="button" onClick={handleAddFriend}>
          Add Friend
        </button>
      )}
    </div>
  );
}

function Friend({ friend, onChangeFriend }) {
  const [owe, setOwe] = useState(0);
  return (
    <div className="sidebar">
      <li>
        <h3>{friend.id}</h3>
        <img src={friend.image} alt={`profile of user ${friend.name}`} />
        <button className="button" onClick={() => onChangeFriend(friend.id)}>
          select
        </button>
        {owe === 0 ? (
          <p>You and {friend.name} are Even</p>
        ) : owe > 0 ? (
          <p className="green">
            {friend.name} owes you {owe}
          </p>
        ) : (
          <p className="red">
            You owe {friend.name} {owe * -1}
          </p>
        )}
      </li>
    </div>
  );
}

function NewFriendForm(onAddNewFriend) {
  return (
    <div className="form-add-friend">
      <form className="form-add-friends"> hi dude</form>
    </div>
  );
}

function BillData() {
  const [bill, setBill] = useState(0);

  return (
    <form className="form-split-bill">
      <label>
        Bill value:
        <input
          type="text"
          value={bill}
          onChange={(e) => setBill(e.target.value)}
        />
      </label>
    </form>
  );
}
