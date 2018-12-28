import React, { Component } from "react";
import { Link } from "react-router-dom";
import { OverlayTrigger, Popover } from "react-bootstrap";
import { Input, TextArea, FormBtn } from "../Form";
import axios from "axios";
let tripId = localStorage.getItem("tripId");

const styles = {
  p: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: "35px",
    color: "white",
    background: "black",
    borderRadius: "5px",
    padding: "15px",
    boxShadow: "1px 3px 8px 1px #888888"
  },
  profileBtn: {
    border: "2px solid white",
    color: "white",
    background: "black",
    fontSize: "17px",
    borderRadius: "5px",
    paddingRight: "5px",
    paddingLeft: "5px",
    cursor: "pointer",
    float: "right",
    position: "relative",
    // top: "130px",
    right: "50px",
    bottom: "60px"
  }
};

class TripHeader extends Component {
  state = {
    city: "",
    arrival: "",
    departure: ""
  };

  renderPopupForm = () => (
    <form>
      <label>City</label>
      <Input
        value={this.state.city}
        onChange={this.handleInputChange.bind(this)}
        name="city"
      />
      <label>Arrival</label>
      <Input
        value={this.state.arrival}
        onChange={this.handleInputChange.bind(this)}
        name="arrival"
      />
      <label>Departure</label>
      <Input
        value={this.state.departure}
        onChange={this.handleInputChange.bind(this)}
        name="departure"
      />
      <FormBtn
        // disabled={!(this.state.newTrip)}
        onClick={this.handleFormSubmit}
      />
    </form>
  );

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    // event.preventDefault();
    // if (this.state.title && this.state.author) {
    axios
      .post("api/trips/addTripLeg/" + tripId, {
        city: this.state.city,
        arrivalDate: this.state.arrival,
        departureDate: this.state.departure
      })
      .then(function(response) {
        // console.log(response);
      })
      .catch(function(error) {
        console.log("Error: " + error);
      });
  };

  render() {
    return (
      <div>
        <p style={styles.p}>{this.props.name}</p>
        <OverlayTrigger
          trigger="click"
          rootClose="true"
          placement="left"
          overlay={
            <Popover id="popover-trigger-click">
              {this.renderPopupForm()}
            </Popover>
          }
        >
          <a
            style={styles.profileBtn}
            data-container="body"
            data-toggle="popover"
            data-placement="left"
          >
            <span className="fa fa-pencil" /> Add A City
          </a>
        </OverlayTrigger>
      </div>
    );
  }
}

export default TripHeader;
