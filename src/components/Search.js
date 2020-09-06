import React, { useState } from "react";
import Dropdown from './Dropdown';

const options = [
  {
    label: 'All',
    value: ''
  },
  {
    label: 'Movies',
    value: 'movie'
  },
  {
    label: 'Series',
    value: 'series'
  },
  {
    label: 'Episodes',
    value: 'episode'
  }
];

const Search = (props) => {
  const [searchTerm, setSearchTerm] = useState("");

  //Dropdown selected value
  const [selectedType,setSelectedType] = useState(options[0]);


  const handleSubmit = (e) => {
    e.preventDefault();
    props.search(searchTerm,selectedType.value);
    setSearchTerm("");
  }

  return (
    <div className="search">
      <form className="ui form">
        <div className="inline fields">
          <div className="eight wide field">
            <input
              placeholder="enter movie title.."
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)} 
            />
          </div>
          <Dropdown 
            options={options}
            selected={selectedType}
            onSelectedChange={setSelectedType}
          />
          <div className="two wide field">
            <input 
              className="ui button"
              onClick={handleSubmit} 
              type="submit" 
              value="SEARCH"
            />
          </div>
        </div>
      </form>
    </div>
    );
}

export default Search;