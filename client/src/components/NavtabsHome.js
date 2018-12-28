import React from "react";
import { Link } from "react-router-dom";

const styles = {
  color: {
    color: "white",
    textDecoration: "none",
    float: "right",
    marginRight: "10px"
  },
  height: {
    padding: "15px",
    fontSize: "24px"
  },
  logo: {
    fontSize: "30px"
  },
  Navbar: {
    borderRadius: "0px"
  }
};

const Navtabs = () => (
  <nav
    style={styles.height}
    className="navbar navbar-expand-lg navbar-dark bg-dark"
    style={styles.Navbar}
  >
    <Link to="/Home">
      <span style={styles.logo} className="navbar-brand">
        Travelo
      </span>
    </Link>
  </nav>
);

export default Navtabs;
