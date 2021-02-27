import React, { useState } from "react";
import "./Ticket.scss";

const Ticket = () => {
  const users = [
    {
      _id: "1",
      Title: "New Task",
      Assignee: "Razan Kiwan",
      Status: "new",
      Goal: "Buy a product",
    },
    {
      _id: "2",
      Title: "New Task",
      Assignee: "Noor Saad",
      Status: "new",
      Goal: "Buy a product",
    },
    {
      _id: "3",
      Title: "New Task",
      Assignee: "Sana Atrash",
      Status: "new",
      Goal: "Buy a product",
    },
    {
      _id: "4",
      Title: "New Task",
      Assignee: "Razan Kiwan",
      Status: "New",
      Goal: "Buy a product",
    },
    {
      _id: "5",
      Title: "New Task",
      Assignee: "Razan Kiwan",
      Status: "Snoozed",
      Goal: "Buy a product",
    },
  ];

  const [selectedUser, setSelectedUser] = useState({
    _id: "2",
    Title: "",
    Assignee: "Noor Saad",
    Status: "new",
    Goal: "Buy a product",
  });
  const [counter, setCounter] = useState(25);
  const [counterError, setCounterError] = useState(false);

  const getNameFirstChars = (name) => {
    const chars = name.toString().toUpperCase().split(` `);
    return chars[0][0] + chars[1][0];
  };
  const getColor = (status) => {
    switch (status) {
      case "New":
        return "red";
      case "Snoozed":
        return "yellow";
      default:
        return "blue";
    }
  };

  const handleOnChange = (e) => {
    const { value, name } = e.target;
    setSelectedUser((prev) => ({ ...prev, [name]: value }));
    setCounter(25 - value.length);
    if (value.length > 25) {
      setCounterError(true);
    } else {
      setCounterError(false);
    }
  };
  return (
    <div className="cols-container">
      <div className="first-col">
        {users.map((el) => {
          return (
            <div key={el._id} className="profile">
              <span>{getNameFirstChars(el.Assignee)}</span>
              {el._id === selectedUser._id ? null : (
                <span
                  className="status"
                  style={{ backgroundColor: getColor(el.Status) }}
                ></span>
              )}
            </div>
          );
        })}
      </div>
      <div className="second-col">
        <div className="fields-container">
          <span className="classify">Classify</span>
          <p className="color-light-gray">What's the user asking for?</p>
          <select
            name="Goal"
            value={selectedUser.Goal}
            className="select-list display-block"
            onChange={handleOnChange}
          >
            <option value="">Select</option>
            <option value="Buy a product">Buy a product</option>
            <option value="Ask about product">Ask about product</option>
            <option value="Sale a product">Sale a product</option>
          </select>
          <span className="color-light-gray display-block">Task name</span>
          <input
            type="text"
            name="Title"
            placeholder="Buy what?"
            value={selectedUser.Title}
            onChange={handleOnChange}
          />
          <span
            className="display-block"
            style={{ color: counterError ? "red" : "#b9b5b5" }}
          >
            (Characters left: {counter})
          </span>
        </div>
        <button
          className="proceed-btn"
          disabled={counterError || selectedUser.Goal.length === 0}
        >
          Proceed
        </button>
      </div>
      <div className="third-col">
        <div className="msg-header">
          <span>New task</span>
          <span>&#128232;</span>
          <span>&#128336;</span>
          <span>00:00</span>
        </div>
        <div className="msg-body">
          <input type="text" />
        </div>

        <div className="msg-footer">
          <hr />
          <input type="text" placeholder="Type a message" />
        </div>
      </div>
    </div>
  );
};

export default Ticket;
