import React from "react";
import { Button, Fa } from 'mdbreact';
import "./SaveBtn.css";

// The ...props means, spread all of the passed props onto this element
// That way we don't have to define them all individually
const SaveBtn = props => (
  <Button className="save-btn btn-circle" {...props}>
    <Fa icon="save" />
  </Button>
);

export default SaveBtn;
