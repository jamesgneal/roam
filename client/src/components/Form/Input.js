import React from "react";

const Input = props => (
  <div className="input-group">
    <div className="input-group-prepend">
      <div className="input-group-text">&#x1F50D;</div>
    </div>
    <input
      type="text"
      className="form-control"
      {...props}
      id="inlineFormInputGroupUsername"
      placeholder="What are you looking for?"
    />
  </div>
);

export default Input
