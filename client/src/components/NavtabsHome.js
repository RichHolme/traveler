import React from "react";
import { Link } from "react-router-dom";

const styles = {
  color: {
    color: "white",
    textDecoration: "none",
    float: "right",
    marginRight: "10px"
  },
  logo: {
    fontSize: "35px"
  },
  Navbar: {
    borderRadius: "0px",
    padding: "10px",
    fontSize: "24px"
  },
  inspiration: {
    color: "White",
    // marginTop: "10%",
    // marginBottom: "40px",
    fontSize: "30px",
    fontWeight: "bold",
    position: "fixed",
    top: '0',
    width: '50%',
    margin: 'auto',
    left: "25%",
    marginTop: '1%',
    textAlign: 'center'
  },
};

const Navtabs = () => (
  <nav
    className="navbar navbar-expand-lg navbar-dark bg-dark"
    style={styles.Navbar}
  >
    <div style={styles.inspiration}>
      {" "}
      Take solo travel to the next level with Travelo
    </div>
    <Link to="/Home">
      <span style={styles.logo} className="navbar-brand">
        Travelo
      </span>
      {/* <span style={styles.logo} className="">
        Take solo travel to the next level with Travelo
      </span> */}
    </Link>
  </nav>
);

export default Navtabs;
