// import React from "react";
import { Link } from "react-router-dom";
import React, { Component } from "react";
import axios from "axios";
import { OverlayTrigger, Popover } from "react-bootstrap";
import { InputTrip, FormBtn } from "./Form";
import { Button } from "react-bootstrap";
let userId = localStorage.getItem("userId");
let tripId = "";

const styles = {
  root: {
    backgroundImage:
      "url(https://i.pinimg.com/originals/cc/a5/02/cca5022c86f67861746d7cf2eb486de8.gif)",
    backgroundSize: "cover",
    overflow: "hidden",
    height: "750px",
    marginTop: "-75px",
    textAlign: "center",
    width: "100%"
  },
  color: {
    color: "white",
    textDecoration: "none",
    float: "right"
  },
  height: {
    padding: "15px",
    fontSize: "24px"
  },
  logo: {
    fontSize: "30px"
  },
  dropDown: {
    fontSize: "20px",
    fontWeight: "bold",
    textDecoration: "none",
    color: "black"
  },
  dropNav: {
    marginTop: "5px"
  },
  newTrip: {
    marginTop: "18px",
    marginRight: "10px",
    marginLeft: "10px",
    cursor: "pointer"
  },
  logoutBtn: {
    width: "20%",
    padding: "15px"
  },
  logout: {
    color: "white",
    backgroundColor: "black",
    textDecoration: "none",
    float: "right",
    marginLeft: "15px",
    lineHeight: "25px",
    fontSize: "20px",
    fontWeight: "bold"
  },
  Navbar: {
    borderRadius: "0px"
  },
  lineHeight: {
    lineHeight: "50px"
  }
};

class Navtabs extends Component {
  state = {
    trips: [],
    newTrip: ""
  };

  componentDidMount() {
    axios
      .get("/api/trips/getUserTrips/" + userId)
      .then(response => {
        // console.log(response.data);
        this.setState({
          trips: response.data
        });
      })
      .catch(function(error) {
        console.log("Error: " + error);
      });
  }

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    axios
      .post("api/trips/new/", {
        tripUser: userId,
        tripName: this.state.newTrip
      })
      .then(function(response) {
        console.log(response);
      })
      .catch(function(error) {
        console.log("Error: " + error);
      });
  };

  renderPopupForm = () => (
    <form>
      <InputTrip
        value={this.state.newTrip}
        onChange={this.handleInputChange.bind(this)}
        name="newTrip"
      />
      <FormBtn
        // disabled={!(this.state.newTrip)}
        onClick={this.handleFormSubmit}
      />
    </form>
  );

  setTrip = tripId =>
    // console.log(tripId)
    localStorage.setItem("tripId", tripId);

  refreshPage = () => window.location.reload();


  render() {
    // console.log(this.state);
    return (
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
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div
          className="collapse navbar-collapse"
          id="navbarNavDropdown"
          style={styles.color}
        >
          <ul className="navbar-nav" style={styles.color}>
            <li className="nav-item active" style={styles.color}>
              <Link to="/Profile" style={styles.color}>
                <span className="nav-link" style={styles.color}>
                  My Profile <span className="sr-only">(current)</span>
                </span>
              </Link>
            </li>
            <li className="nav-item active" style={styles.newTrip}>
              {/* <Link to="/Profile" style={styles.color}> */}
              <OverlayTrigger
                trigger="click"
                placement="bottom"
                rootClose="true"
                overlay={
                  <Popover id="popover-trigger-click">
                    {this.renderPopupForm()}
                  </Popover>
                }
              >
                <span>
                  New Trip <span className="sr-only">(current)</span>
                </span>
              </OverlayTrigger>
            </li>

            <li style={styles.dropNav} className="nav-item dropdown">
              <a
                style={styles.color}
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                My Trips
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                {this.state.trips.map(trip => {
                  return (
                    <Link to="/Trips" onClick={this.refreshPage}>
                      <a
                        tripId={trip._id}
                        onClick={() => this.setTrip(trip._id)}
                        style={styles.dropDown}
                        className="dropdown-item"
                      >
                        {trip.tripName}
                      </a>
                    </Link>
                  );
                })}
              </div>
            </li>
            {/* </li> */}
            <div className="logoutBtn">
              <Button
                bsStyle="danger"
                style={styles.logout}
                bsSize="small"
                href="/auth/logout"
              >
                Logout
              </Button>
            </div>
          </ul>
        </div>
      </nav>
    );
  }
}

export default Navtabs;
