import React, { Component } from "react";
import Navtabs from "./NavtabsHome.js";
import { Link } from "react-router-dom";

class NewUser extends Component {
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
              <label for="exampleInputEmail1">User Name</label>
              <input
                className="form-control"
                aria-describedby="emailHelp"
                placeholder="User Name"
              />
            </div>
            <div style={this.styles.text} class="form-group">
              <label for="exampleInputEmail1">Email address</label>
              <input
                type="email"
                className="form-control"
                aria-describedby="emailHelp"
                placeholder="Enter email"
              />
              <small className="form-text">
                Don't worry, you're in good hands. Chances are we get hacked or
                we sell your email to the highest bidder.
              </small>
            </div>
            <div style={this.styles.text} className="form-group">
              <label for="exampleInputPassword1">Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Password"
              />
            </div>
            <Link to="/Profile">
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

export default NewUser;
