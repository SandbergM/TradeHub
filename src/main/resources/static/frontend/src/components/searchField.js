import React, { useState } from "react";
import { Input, InputGroup, InputGroupAddon, InputGroupText } from "reactstrap";

const SearchField = (props) => {
  const [searchQuery, setSearchQuery] = useState({});

  const queryBuilder = () => {
    let query = "";

    Object.entries(searchQuery).forEach(([key, val]) => {
      query += `&${key}=${val}`;
    });

    props.setQuery(query.replace("&", "?"));
  };

  return (
    <div className="mt-4 mb-5 col-12">
      <InputGroup>
        <Input
          className="searchbar"
          placeholder="Sök"
          onChange={(e) => {
            setSearchQuery({ ...searchQuery, title: e.target.value });
          }}
        />
        <InputGroupAddon addonType="append">
          <InputGroupText>
            <span
              className="material-icons"
              role="button"
              onClick={(e) => {
                queryBuilder();
              }}
            >
              search
            </span>
          </InputGroupText>
        </InputGroupAddon>
      </InputGroup>
    </div>
  );
};

export default SearchField;
