import React from "react";
import "./DeleteBtn.css";
import {
  Button,
  Fa
} from "mdbreact";

// The ...props means, spread all of the passed props onto this element
// That way we don't have to define them all individually
const DeleteBtn = props => (
  <Button className="delete-button btn-circle" {...props}>
    <Fa icon="trash" />
  </Button>
);

export default DeleteBtn;
