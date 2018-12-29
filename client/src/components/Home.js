import React, { Component } from "react";
import { Link } from "react-router-dom";
import Navtabs from "./NavtabsHome";
import $ from 'jquery';
// import Background from '../images/background.png';

const styles = {
  button:{
    // height: "50px",
    fontSize: "28px",
    // width: "250px",
    opacity: "10",
    color: "white",
    width: "100%"
  },
  inspiration: {
    color: "White",
    // marginTop: "10%",
    // marginBottom: "40px",
    fontSize: "25px",
    fontWeight: "bold",
    position: "fixed",
    top: '0',
    width: '50%',
    margin: 'auto',
    left: "25%",
    marginTop: '1.5%'
  },
  div:{
    margin: "auto",
    width: "500px",
    textAlign: "center",
    marginTop: "10%"
  },
  container:{
    textAlign: "center"
  }
};

class Home extends Component {
  render() {
    $('body').css('background-image', 'url(./images/background.png)');
    return (
      <div style={styles.container}>
        <Navtabs />
        {/* <div style={styles.inspiration}>
          {" "}
          Take solo travel to the next level with Travelo
        </div> */}
        <div style={styles.div}>
          <Link to="/NewUser">
            <button style={styles.button} className="btn btn-dark">Sign Up</button>
          </Link>
          <Link to="/SignIn">
            <button style={styles.button} className="btn btn-dark">Sign In</button>
          </Link>
        </div>
      </div>
    );
  }
}

export default Home;
