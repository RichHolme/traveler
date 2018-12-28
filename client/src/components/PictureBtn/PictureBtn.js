import React from "react";
import CardBtn from "../CardBtn";
import "./Card.css";

const Card = props => (
  <div
    className="card"
    style={{
      backgroundImage: props.image ? `url(${props.image})` : "none"
    }}
  >
    <CardBtn onClick={props.handleBtnClick} data-value="pick" />
  </div>
);

export default Card;
