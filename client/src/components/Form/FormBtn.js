import React from "react";

export const FormBtn = props => (
  <button {...props} style={{ float: "right", marginBottom: 10, opacity: 12, color: "white" }} className="btn btn-dark">
    {props.children}
    Add
  </button>
);
