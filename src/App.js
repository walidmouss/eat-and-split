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
  const [friends, setFriends] = useState(initialFriends);
  const [currFriend, setCurrFriend] = useState(null);
  function handleCurrFriend(friend) {
    setCurrFriend(friend);
  }
  function handleSetFriends(newFriend) {
    setFriends((prev) => [...prev, newFriend]);
  }

  return (
    <div className="app">
      <FriendList
        friends={friends}
        currFriend={currFriend}
        onChangeFriend={handleCurrFriend}
        onSetFriends={handleSetFriends}
      />
      {currFriend && (
        <BillData
          friends={friends}
          friend={currFriend}
          setFriends={setFriends}
        />
      )}
    </div>
  );
}
export default App;

function FriendList({ friends, currFriend, onChangeFriend, onSetFriends }) {
  const [FormOpen, setFormOpen] = useState(false);

  function handleAddFriend() {
    setFormOpen(true);
  }
  return (
    <div className="sidebar">
      {friends.map((friend) => (
        <ul>
          <Friend
            friend={friend}
            onChangeFriend={onChangeFriend}
            currFriend={currFriend}
            friends={friends}
            key={friend.id}
          />
        </ul>
      ))}
      {FormOpen ? (
        <NewFriendForm onAddNewFriend={onSetFriends} />
      ) : (
        <button className="button" onClick={handleAddFriend}>
          Add Friend
        </button>
      )}
    </div>
  );
}

function Friend({ friend, onChangeFriend, currFriend, friends }) {
  const owe = friend.balance;

  return (
    <div className="sidebar">
      <li>
        <h3>{friend.id}</h3>
        <img src={friend.image} alt={`profile of user ${friend.name}`} />
        <button className="button" onClick={() => onChangeFriend(friend)}>
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

function NewFriendForm({ onAddNewFriend }) {
  const [friendName, setName] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc/48");

  function handleSubmit(e) {
    e.preventDefault();

    if (!friendName || !image) return;

    const id = crypto.randomUUID();
    const newFriend = {
      id,
      name: friendName,
      image: `${image}?=${id}`,
      balance: 0,
    };

    onAddNewFriend(newFriend);

    setName("");
    setImage("https://i.pravatar.cc/48");
  }

  return (
    <div className="form-add-friend">
      <form className="form-add-friends" onSubmit={handleSubmit}>
        <label>What's your name?</label>
        <input
          type="text"
          value={friendName}
          onChange={(e) => setName(e.target.value)}
        />

        <label>🌄 Image URL</label>
        <input
          type="text"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />

        <button className="button" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

function BillData({ friend, setFriends }) {
  const [bill, setBill] = useState(0);
  const [myExpenses, setMyExpenses] = useState(0);
  const [pay, setPay] = useState("You");

  function handleBillForm(e) {
    e.preventDefault();
    const finalExpenses = pay === "You" ? bill - myExpenses : -myExpenses;
    setFriends((prev) =>
      prev.map((f) =>
        f.id === friend.id ? { ...f, balance: f.balance + finalExpenses } : f
      )
    );
  }

  return (
    <form className="form-split-bill" onSubmit={handleBillForm}>
      <h2>Split the bill with {friend.name}</h2>
      <label>Bill value:</label>
      <input
        type="text"
        value={bill}
        onChange={(e) => setBill(e.target.value)}
      />

      <label>Your expenses:</label>
      <input
        type="text"
        value={myExpenses}
        onChange={(e) => setMyExpenses(e.target.value)}
      />

      <label>{friend.name}'s part is:</label>
      <input
        type="text"
        value={Number(bill) - Number(myExpenses)}
        onChange={(e) => setMyExpenses(e.target.value)}
        disabled
      />

      <label>who's paying the bill?</label>
      <select value={pay} onChange={(e) => setPay(e.target.value)}>
        <option value="You">You</option>
        <option value={friend.name}>{friend.name}</option>
      </select>

      <button type="submit" className="button">
        Submit
      </button>
    </form>
  );
}
