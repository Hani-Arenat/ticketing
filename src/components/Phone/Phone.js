import React, { useState, useRef } from "react";
import Flag from "../../assets/images/usa-flag.png";
import useOnClickOutside from "../../utils/useOnClickOutside";
import "./Phone.scss";

const Phone = () => {
  const phoneInputRef = useRef();

  const [phoneInputText, setPhoneInputText] = useState("");
  const [showOptionsList, setShowOptionsList] = useState(false);
  const [showCountries, setShowCountries] = useState(false);

  const [searchText, setSearchText] = useState("");
  // USA is the default country
  const [selectedCountry, setSelectedCountry] = useState({
    name: "USA",
    flag: Flag,
    code: "+1",
  });

  // this static data suppose to come from the server or API
  // then we use setCountries method, right now no need for it
  // it's represent the Orignial/All Data
  // eslint-disable-next-line
  const [countries, setCountries] = useState([
    {
      name: "Canada",
      code: "+2",
      flag: Flag,
    },
    {
      name: "Denmark",
      code: "+3",
      flag: Flag,
    },
    {
      name: "Norway",
      code: "+4",
      flag: Flag,
    },
    {
      name: "Sweden",
      code: "+5",
      flag: Flag,
    },
    {
      name: "Finland",
      code: "+6",
      flag: Flag,
    },
    {
      name: "Iceland",
      code: "+7",
      flag: Flag,
    },
    {
      name: "Jordan",
      code: "+8",
      flag: Flag,
    },
    {
      name: "Palestine",
      code: "+9",
      flag: Flag,
    },
  ]);
  const [filteredData, setFilteredData] = useState([...countries]);

  // Handle onClick outside
  const optionsRef = useRef();
  useOnClickOutside(optionsRef, () => {
    setShowOptionsList(false);
    setShowCountries(false);
    setSearchText("");
    setFilteredData([...countries]);
  });

  const handleOnCountriesSearch = (e) => {
    const { value } = e.target;
    setSearchText(value);
    if (value.length > 0) {
      let _filtered = countries.filter((el) =>
        el.name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredData([..._filtered]);
    } else {
      setFilteredData([...countries]);
    }
  };

  const showList = () => {
    setShowOptionsList(true);
  };

  const handleSelectedCountryChange = (data) => {
    // save current selected country to put it in countries data
    const currentCountry = { ...selectedCountry };

    // find the new selected country and set it as the selected country
    const selectedCountryIndex = countries.findIndex(
      (el) => el.code === data.code
    );
    const selectedCountryData = { ...countries[selectedCountryIndex] };
    setSelectedCountry({ ...selectedCountryData });

    // remove the new selected and add the old one
    countries.splice(selectedCountryIndex, 1);
    countries.push(currentCountry);
    setFilteredData([...countries]);
    setSearchText("");

    // hide the options and focus the cursor on phone input
    setShowCountries(false);
    phoneInputRef.current.focus();
  };

  const handleOnClick = () => {
    setShowCountries(false);
    setSearchText("");
    phoneInputRef.current.focus();
  };
  const handleSearchText = (e) => {
    const { value } = e.target;
    setPhoneInputText(value);
  };
  const handleClearSearch = () => {
    setSearchText("");
    setFilteredData([...countries]);
  };
  const handlePhoneInputTextOnFocus = () => {
    showList();
    setSearchText("");
    setShowCountries(false);
    setFilteredData([...countries]);
  };
  return (
    <div className='phone-container'>
      <div className="phone-body" ref={optionsRef}>
        <span onClick={() => showList()}>{selectedCountry.code}</span>
        <input
          type="number"
          onChange={handleSearchText}
          value={phoneInputText}
          onFocus={handlePhoneInputTextOnFocus}
          ref={phoneInputRef}
        />
        <ul
          className={
            showOptionsList ? "display-block main-list" : "display-none"
          }
        >
          <li key={selectedCountry.code} onClick={() => handleOnClick()}>
            <img src={selectedCountry.flag} alt="pic" />
            <span>{`${selectedCountry.name} (${selectedCountry.code})`}</span>
          </li>
          <li key="_search" style={{ position: "relative" }}>
            <input
              type="text"
              placeholder="Search"
              value={searchText}
              onChange={handleOnCountriesSearch}
              onFocus={() => setShowCountries(true)}
            />
            {searchText.length > 0 && (
              <span className="close-icon" onClick={handleClearSearch}>
                &#10006;
              </span>
            )}
          </li>
          {showCountries && (
            <li>
              <ul className="sub-list">
                {filteredData.map((el) => {
                  return (
                    <li
                      key={el.code}
                      onClick={() => handleSelectedCountryChange(el)}
                    >
                      <img src={el.flag} alt="pic" />
                      <span>{`${el.name} (${el.code})`}</span>
                    </li>
                  );
                })}
              </ul>
            </li>
          )}
          {showCountries && filteredData.length === 0 && (
            <li key="_empty">No Results</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Phone;
