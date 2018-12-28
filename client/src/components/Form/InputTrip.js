import React from "react";
import { Input } from ".";

export const InputTrip = props => 
  <div className="form-group">
    {console.log(props)}
    <label>Trip Name</label>
    <input className="form-control" type="text" value={props.value} name={props.name} onChange={props.onChange}/>
  </div>