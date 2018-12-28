import React from "react";

export const Input = props => (
  <div className="form-group">
    <input className="form-control" type="text" value={props.value} name={props.name} onChange={props.onChange}/>
  </div>
);
