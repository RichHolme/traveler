import React, { Component } from "react";
import { Link } from "react-router-dom";
import $ from 'jquery';

const styles = {
  p: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: "30px",
    color: "white",
    background: "black",
    borderRadius: "5px",
    padding: "10px",
    boxShadow: "1px 3px 8px 1px #888888",
    // zIndex: '1',
    // position: 'fixed',
    // width: '100%'
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
  },

  dataBtn: {
    border: "2px solid white",
    color: "white",
    background: "black",
    borderRadius: "5px",
    float: "left",
    position: "relative",
    // top: "130px",
    left: "50px",
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

const showData = (name) => {
  console.log('inside function')
  console.log(name)
  if($("#"+name.split(' ').join('')+"").hasClass('hide')){
    $("#"+name.split(' ').join('')+"").removeClass('hide')
  }else{
    $("#"+name.split(' ').join('')+"").addClass('hide')
  }
  
}
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

      <button 
        style={styles.dataBtn}
        onClick={() =>
          
          showData(props.name)
        }
        >
          <span className="fa fa-pencil" /> data
        </button>

    </div>
  );
};

export default Destination;
