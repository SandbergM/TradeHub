import React from "react";
import { Input, InputGroup, InputGroupAddon, InputGroupText } from "reactstrap";

const SearchField = () => {
  return (
    <div className="mt-4 mb-5">
      <InputGroup>
        <Input className="searchbar" placeholder="Sök" />
        <InputGroupAddon addonType="append">
          <InputGroupText>
            <span className="material-icons" role="button">
              search
            </span>
          </InputGroupText>
        </InputGroupAddon>
      </InputGroup>
    </div>
  );
};

export default SearchField;
