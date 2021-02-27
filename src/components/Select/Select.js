import React, { useState } from "react";
import "./Select.scss";

const Select = () => {
  const [inputSearchText, setInputSearchText] = useState("");

  // this static data suppose to come from the server or API
  // then we use setQuestionsList method, right now no need for it
  // it's represent the Orignial/All Data List
  // eslint-disable-next-line
  const [questionsList, setQuestionsList] = useState([
    {
      name: "Budget",
      isAdded: false,
    },
    {
      name: "Food Costs",
      isAdded: false,
    },
    {
      name: "Number of people",
      isAdded: false,
    },
    {
      name: "Special orders count",
      isAdded: false,
    },
    {
      name: "Active users",
      isAdded: false,
    },
  ]);
  const [filteredData, setFilteredData] = useState([...questionsList]);

  const handleSearchText = (e) => {
    const { value } = e.target;
    setInputSearchText(value);
    if (value.length > 0) {
      let _filtered = questionsList.filter((el) =>
        el.name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredData([..._filtered]);
    } else {
      setFilteredData([...questionsList]);
    }
  };

  const handleAddDeleteOption = (data) => {
    let tempOptionsList = [...questionsList];
    let myItemIndex = tempOptionsList.findIndex((el) => el.name === data.name);
    tempOptionsList[myItemIndex].isAdded = !tempOptionsList[myItemIndex]
      .isAdded;
    setQuestionsList([...tempOptionsList]);
  };

  const getStatus = (status) => {
    return status ? <span>&#10003;</span> : <span>+</span>;
  };
  return (
    <div className="list-container">
      <div className="list-body">
        <input
          type="text"
          placeholder="Search questions"
          onChange={handleSearchText}
          value={inputSearchText}
        />
        <ul className="main-questions-list">
          {filteredData.map((el, index) => {
            return (
              <li
                key={index}
                onClick={() => handleAddDeleteOption(el)}
                className={
                  el.isAdded
                    ? "item-disabled display-flex-between"
                    : "display-flex-between"
                }
              >
                <span>{el.name}</span>
                {getStatus(el.isAdded)}
              </li>
            );
          })}

          {filteredData.length === 0 && <li key="_empty">No Results</li>}
        </ul>
      </div>
    </div>
  );
};

export default Select;
