import React from "react";

export const Input = props => (
  // <div className="form-group">
  //   <input className="form-control" {...props} />
  // </div>

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
