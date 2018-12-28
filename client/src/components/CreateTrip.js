import React, { Component } from "react";
import Navtabs from "./Navtabs.js";
import { Link } from "react-router-dom";

class CreateTrip extends Component {
  state = {};

  styles = {
    form: {
      marginTop: "80px",
      width: "500px",
      height: "200px",
      display: "inline-block"
    },
    body: {
      textAlign: "center",
      backgroundImage:
        "url(https://i.pinimg.com/originals/cc/a5/02/cca5022c86f67861746d7cf2eb486de8.gif)",
      backgroundSize: "cover",
      overflow: "hidden",
      height: "750px",
      marginTop: "-75px",
      textAlign: "center",
      width: "100%",
      fontSize: "20px"
    },
    text: {
      textAlign: "left"
    },
    textSize: {
      fontSize: "20px",
      opacity: "10",
      color: "white"
    }
  };

  render() {
    return (
      <div>
        <Navtabs />
        <div style={this.styles.body}>
          <form style={this.styles.form}>
            <div style={this.styles.text} class="form-group">
              <label for="exampleInputEmail1">Trip Name</label>
              <input className="form-control" placeholder="Trip name" />
            </div>
            <div style={this.styles.text} class="form-group">
              <label for="exampleInputEmail1">Trip Location</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your destination city"
              />
            </div>
            <div style={this.styles.text} className="form-group">
              <label for="exampleInputPassword1">Enter Your Arrival Date</label>
              <input
                type="date"
                className="form-control"
                placeholder="dd/mm/yyyy"
              />
            </div>
            <Link to="/Cities">
              <button
                style={this.styles.textSize}
                type="submit"
                className="btn btn-dark"
              >
                Submit
              </button>
            </Link>
          </form>
        </div>
      </div>
    );
  }
}

export default CreateTrip;
