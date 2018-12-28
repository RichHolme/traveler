import React, { Component } from "react";
import { Link } from "react-router-dom";

const styles = {
  p: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: "30px",
    color: "white",
    background: "black",
    borderRadius: "5px",
    padding: "10px",
    boxShadow: "1px 3px 8px 1px #888888"
  },
  profileBtn: {
    border: "2px solid white",
    color: "white",
    background: "black",
    borderRadius: "5px",
    float: "right",
    position: "relative",
    // top: "130px",
    right: "50px",
    bottom: "53px"
  }
};

const setLeg = legId => (
  // console.log(tripId)
  localStorage.setItem("tripLegId", legId)
)

const refreshPage = () => (
  window.location.reload()
)
// onClick={() => refreshPage()}

const Destination = props => {
  return (
    <div>
      <p style={styles.p}>
        {props.name}
      </p>
      <Link to={"/Cities/" + props.name} onClick={() => setLeg(props.legId)}>
        <button style={styles.profileBtn}>
          <span className="fa fa-pencil" /> Customize Your Trip
        </button>
      </Link>
    </div>
  );
};

export default Destination;
