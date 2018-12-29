import React, { Component } from "react";
import Navtabs from "../NavtabsHome.js";
import { Link } from "react-router-dom";
import style from "./style.css";

class NewUser extends Component {
  state = {};

  styles = {
    form: {
      marginTop: "3%",
      width: "500px",
      height: "200px",
      display: "inline-block"
    },
    body: {
      textAlign: "center",
      backgroundSize: "cover",
      overflow: "hidden",
      height: "750px",
      // marginTop: "-75px",
      textAlign: "center",
      width: "100%",
      fontSize: "20px",
    },
    input: {
      textAlign: "left",
      opacity: "10"
    },
    button: {
      opacity: "10",
      color: "white"
    },
    opacity: {
      opacity: "10 !important",
      backgroundColor: "#fbf8ee !important"
    }
  };

  render() {
    return (
      <div>
        <Navtabs />
        <div style={this.styles.body}>
          <form style={this.styles.form}>
            <div style={this.styles.input} class="form-group">
              <label for="exampleInputEmail1">User Name</label>
              <input
                style={this.styles.opacity}
                className="form-control"
                aria-describedby="emailHelp"
                placeholder="User Name"
              />
            </div>
            <div style={this.styles.input} class="form-group">
              <label for="exampleInputEmail1">Email address</label>
              <input
                style={this.styles.opacity}
                type="email"
                className="form-control"
                aria-describedby="emailHelp"
                placeholder="Enter email"
              />
              {/* <small className="form-text">
                Don't worry, you're in good hands. Chances are we get hacked or
                we sell your email to the highest bidder.
              </small> */}
            </div>
            <div style={this.styles.input} className="form-group">
              <label for="exampleInputPassword1">Password</label>
              <input
                style={this.styles.opacity}
                type="password"
                className="form-control"
                placeholder="Password"
              />
            </div>
            <Link to="/Profile">
              <button
                style={this.styles.button}
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

export default NewUser;
