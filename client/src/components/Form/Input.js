import React from "react";

const Input = props => (
  <div className="input-group yelpsearch md-form form-sm form-1 pl-0">
    <div className="input-group-prepend">
      <span className="input-group-text black lighten-3" id="basic-text1">
      <i className="fa fa-search text-white" aria-hidden="true" />
      </span>
    </div>
    <input
      type="text"
      className="form-control my-0 py-1"
      {...props}
      id="inlineFormInputGroupUsername"
      placeholder="Fing something new on Yelp"
      aria-label="Search"
    />
  </div>
);

export default Input
