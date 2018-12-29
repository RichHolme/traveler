import React, { Component } from "react";
import Navtabs from "./Navtabs.js";
import { Link } from "react-router-dom";
import axios from "axios";
import People from "../images/people.gif"
let userId = localStorage.getItem("userId");
let username = localStorage.getItem("userName");
let email = localStorage.getItem("email");
let thumbnail = localStorage.getItem("thumbnail");
thumbnail = thumbnail.slice(0, -2);
thumbnail = thumbnail + "200";

class Profile extends Component {
  
  state = {
    trips: []
  };

  deleteRows(tripId) {
    axios.delete("/api/trips/" + tripId).then(response => {
      this.setState({
        trips: this.state.trips.filter((e, i) => e._id !== tripId)
      });
    });
  }

  componentDidMount() {
    axios
      .get("/api/trips/getUserTrips/" + userId)
      .then(response => {
        console.log(response.data);
        this.setState({
          trips: response.data
        });
      })
      .catch(function(error) {
        console.log("Error: " + error);
      });
  }

  styles = {
    form: {
      marginTop: "80px",
      width: "500px",
      height: "auto",
      display: "inline-block"
    },
    body: {
      textAlign: "center",
      backgroundSize: "cover",
      overflow: "hidden",
      height: "auto",
      width: "100%",
      fontSize: "20px"
    },
    text: {
      textAlign: "left",
      fontSize: "30px",
      lineHeight: "65px",
      paddingLeft: '5%'
    },
    img: {
      height: "100%",
      width: "100%",
      // borderRadius: "50%",
      float: "left",
      // border: "1px solid black"
    },
    container: {
      marginTop: "5%",
      paddingTop: "50px",
      paddingBottom: "50px",
      // paddingLeft: "200px",
      // backgroundColor: "rgba(255, 255, 255, .9)",
      backgroundColor: '#fbfbfb',
      // border: "1px black solid",
      borderRadius: "10px"
    },
    span: {
      marginRight: "20px"
    },
    arrow: {
      fontSize: "25px"
    },
    ul: {
      listStyleType: "none"
    },
    links: {
      color: "black"
    },
    tripBox: {
      height: "auto",
      width: "auto",
      fontWeight: "bold",
      fontSize: "18px",
      color: "black",
      textDecoration: "none",
      backgroundColor: "lightGrey"
    },
    deleteButton: {
      height: "auto",
      width: "auto",
      backgroundColor: "red",
      color: "white",
      fontSize: "18px",
      marginBottom: "20px",
      marginLeft: "20px",
      marginRight: "200px"
    }
  };

  render() {
    console.log(thumbnail);
    return (
      <div>
        <Navtabs />
        <div style={this.styles.body}>
          <div style={this.styles.container} className="container">
            <div id="row">
              <div className="col-md-5">
                <img style={this.styles.img} src={People} />
              </div>
              <div style={this.styles.text} className="col-md-7">
                <div style={this.styles.text}>
                  <span className="fa fa-user" style={this.styles.span}></span> {username}
                </div>
                <div style={this.styles.text}>
                  <span className="fa fa-envelope" style={this.styles.span}></span> {email}
                </div>
                <div>
                  <div style={this.styles.text}>
                    <span style={this.styles.span}>Your Trips:</span>
                  </div>
                  <ul style={this.styles.ul}>
                    {this.state.trips.map((trip, idx) => {
                      return (
                        <div className="row">
                          <div className="col-md-9">
                            <Link to="/Trips">
                              <button 
                                className="btn btn-primary"
                                // style={this.styles.tripBox}
                              >
                                {trip.tripName}
                              </button>
                            </Link>
                          </div>
                          <div className="col-md-3">
                            <button
                              className="btn btn-danger"
                              // style={this.styles.deleteButton}
                              onClick={() => this.deleteRows(trip._id)}
                            >
                              Remove Trip
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
