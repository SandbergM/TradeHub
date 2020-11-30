import React from 'react';
import { Input } from "reactstrap";

const SearchField = () => {

  return(
    <div className="mt-4 mb-5">
      <Input placeholder="Sök" className="col-12 searchbar"></Input>
    </div>
  )
}

export default SearchField;