import React, { Component } from "react";
import Navtabs from "../Navtabs";
import { Link } from "react-router-dom";
import Destination from "./Destination";
import Img from "./Img";
import Headers from "./Headers";
import Events from "./Li";
import Hotels from "./Hotels";
import Row from "./Row";
import Col from "./col";
import Restaurant from "./Restaurants";
import axios from "axios";
import TripHeader from "./TripHeader";
import $ from 'jquery';
let userId = localStorage.getItem("userId");
let tripId = localStorage.getItem("tripId");
console.log("tripid ", tripId);

class Trips extends Component {
  state = {
    trip: {},
    tripLegs: []
  };

  componentDidMount() {
    // console.log("User Id: " + userId);
    axios
      .get("/api/trips/" + tripId)
      .then(response => {
        console.log(response.data.tripLegs[0]);
        this.setState({
          trip: response.data,
          tripLegs: response.data.tripLegs
        });

        
      })
      .catch(function(error) {
        console.log("Error: " + error);
      });
  }

  styles = {
    border: {
      padding: "30px",
      paddingBottom: "0px"
      // paddingRight: '30px',
      // paddingLeft: '30px',
      // marginBottom: "40px"
    }
  };

  render() {
    $('html').css('background-image', 'url(./images/background.png)');
    $('body').css('background-image', 'url(./images/background.png)');
    // console.log(this.trip);
    // $('body').attr()
    // $('body').css('background-image', 'url(#)');
    // $('html').css('background-image', 'url(#)');
    // $('#divID').css("background-image", "url(#)");  
    return (
      <div>
        <Navtabs />

        <div className="container">
          <TripHeader name={this.state.trip.tripName} />
          {/* <Img /> */}
          {this.state.tripLegs.map(trip => {
            return (
              <div style={this.styles.border}>
                <Destination
                  name={trip.city}
                  arrival={trip.arrivalDate.slice(5, 10)}
                  departure={trip.departureDate.slice(5, 10)}
                  legId={trip._id}
                />
                
                <div id={trip.city.split(' ').join('')} className="hide scrollDiv">
                  <Headers />

                  <Row>
                    <Col>
                      {trip.activity.map(event => {
                        if (!event.restaurantBoolean) {
                          return (
                            <Events
                              name={event.name}
                              // date={event.date}
                              location={event.address}
                            />
                          );
                        }
                      })}
                    </Col>
                    <Col>
                      {trip.shelter.map(hotel => {
                        return (
                          <Hotels
                            name={hotel.name}
                            // date={hotel.date}
                            location={hotel.address}
                          />
                        );
                      })}
                    </Col>
                    <Col>
                      {trip.activity.map(restaurant => {
                        if (restaurant.restaurantBoolean) {
                          return (
                            <Restaurant
                              name={restaurant.name}
                              // date={restaurant.date}
                              location={restaurant.address}
                            />
                          );
                        }
                      })}
                    </Col>
                  </Row>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default Trips;
