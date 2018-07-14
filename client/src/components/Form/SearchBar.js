import React from "react";

const SearchBar = props => (
  <div className="input-group md-form form-sm form-1 pl-0">
    <div className="input-group-prepend">
      <span className="input-group-text black lighten-3" id="basic-text1">
        <i className="fa fa-search text-white" aria-hidden="true" />
      </span>
    </div>
    <input
      className="form-control my-0 py-1"
      type="text"
      aria-label="Search"
      {...props}
    />
  </div>
);

export default SearchBar;
