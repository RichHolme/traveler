import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  restaurant,
  getEvents,
  getHotels,
  museum,
  landmarks,
  active,
  weather
} from "../utils/API";
import CityJumbo from "./CityJumbo";
import Hotels from "./Hotels";
import Navtabs from "./Navtabs";
import Sights from "./Sights";
import Nightlife from "./Nightlife";
import Weather from "./Weather";

class Cities extends Component {
  state = {
    city: "",
    cityPic: "",
    lat: "",
    lon: "",
    hotelObj: [],
    museumObj: [],
    landmarkObj: [],
    activeObj: [],
    restaurantObj: [],
    eventObj: [],
    hotelClick: false,
    sightsClick: false,
    drinksClick: false,
    weather: {}
  };

  styles = {
    card: {
      width: "maxWidth: 18rem",
      height: "200px",
      margin: "30px",
      boxShadow: "1px 3px 8px 1px #888888",
      borderRadius: "5px"
    },
    hotelIcon: {
      position: "absolute",
      marginTop: "10px",
      left: 165
    },
    cameraIcon: {
      position: "absolute",
      marginTop: "10px",
      left: 150
    },
    beerIcon: {
      position: "absolute",
      marginTop: "10px",
      left: 175
    },
    city: {
      backgroundImage: `url(${this.state.cityPic})`
    },
    center: {
      textAlign: "center",
      marginTop: "-30px"
    },
    span: {
      position: "relative",
      float: "right",
      // bottom: 10,
      right: 200,
      padding: "10px",
      borderRadius: "50%",
      border: "1px solid black",
      // boxShadow: "0px 1px 5px 1px #888888",
      // marginRight: "250px",
      color: "black",
      fontSize: "18px"
    },
    h2: {
      textAlign: "center",
      marginTop: "-30px",
      marginRight: "-30px"
    }
  };

  componentDidMount() {
    const city = this.props.match.params.city;
    weather(city)
      .then(data =>
        this.setState({ lat: data.data.coord.lat, lon: data.data.coord.lon })
      )
      // .then(data => this.getWeather(data.data))
      .catch(err => console.log("error:  " + err));
    this.setState({
      city: city,
      sightsClick: false,
      drinksClick: false,
      hotelClick: false
    });
    weather(city)
      .then(data => this.getWeather(data.data))
      .catch(err => console.log("Weather error:  " + err));
  }

  getWeather = weatherData => {
    // console.log(
    //   "Weather:  " +
    //     JSON.stringify(weatherData.weather[0].main) +
    //     "  Temperatue:  " +
    //     JSON.stringify(weatherData.main.temp)
    // );

    const conditions = weatherData.weather[0].main;
    const kelvin = weatherData.main.temp;
    const icon = weatherData.weather[0].icon;
    const wxIcon = "http://openweathermap.org/img/w/" + icon + ".png";

    const temp = Math.floor(kelvin * 1.8 - 459.67);
    // console.log(wxIcon);

    this.setState({
      weather: { conditions: conditions, temp: temp, icon: wxIcon }
    });
  };

  getDrinks = (lat, lon) => {
    this.setState({ sightsClick: false, hotelClick: false, drinksClick: true });

    restaurant(lat, lon)
      .then(data => {
        this.setState({ restaurantObj: data.data.results });
        getEvents(lat, lon)
          .then(data => {
            this.setState({ eventObj: data.data.events.event });
          })
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
  };

  getSights = () => {
    console.log("click seen");
    document.getElementsByClassName("hotelsDiv").innerHTML = "";
    document.getElementsByClassName("drinksDiv").innerHTML = "";

    const lat = this.state.lat;
    const lon = this.state.lon;
    this.setState({ sightsClick: true, hotelClick: false, drinksClick: false });

    museum(lat, lon)
      .then(data => {
        this.setState({ museumObj: data.data.results });
        landmarks(lat, lon)
          .then(data => {
            this.setState({
              landmarkObj: data.data.Response.View[0].Result
            });
            active(lat, lon)
              .then(data => {
                this.setState({ activeObj: data.data.results });
              })
              .catch(err => console.log(err));
          })
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
  };

  getHotels = () => {
    document.getElementsByClassName("sightsDiv").innerHTML = "";
    document.getElementsByClassName("drinksDiv").innerHTML = "";

    console.log("click worked");
    const lat = this.state.lat;
    const lon = this.state.lon;
    console.log("Lat:  " + lat + "  Lon:  " + lon);
    this.setState({ hotelClick: true, sightsClick: false, drinksClick: false });
    console.log(
      "Hotels click:  " +
        this.state.hotelClick +
        "\nSights Click:  " +
        this.state.sightsClick
    );

    getHotels(lat, lon)
      .then(data => this.setState({ hotelObj: data.data.results }))
      .catch(err => console.log(err));
  };

  renderSights = (museumObj, landmarkObj, activeObj) => {
    return (
      <Sights museum={museumObj} landmark={landmarkObj} active={activeObj} />
    );
  };

  renderHotels = hotelObj => {
    return (
      <div style={this.styles.scroll}>
        {hotelObj.slice(0, 8).map(hotel => {
          let href;
          hotel.photos
            ? (href = hotel.photos[0].html_attributions[0])
            : "no photo";
          const thisHref = href
            ? href.match(/\".*\"/)[0].replace(/\"/g, "")
            : null;
          return (
            <Hotels
              icon={hotel.icon}
              name={hotel.name}
              address={hotel.vicinity}
              rating={hotel.rating}
              key={hotel.id}
              hotelId={hotel.id}
              photo={thisHref}
            />
          );
        })}
      </div>
    );
  };

  render() {
    return (
      <div>
        <Navtabs />
        <CityJumbo city={this.props.match.params.city} />
        {this.state.weather !== [] ? (
          <Weather weather={this.state.weather} />
        ) : (
          ""
        )}
        <h2 style={this.styles.h2}> Click a card below to get started! 
          <Link to="/Trips">
            <span style={this.styles.span} className="fa fa-arrow-right" /> 
          </Link>
        </h2>
  
        <div className="row justify-content-center">
          {/* Hotel Card */}
          <div
            className="card text-white bg-dark mb-3 col-md-3 col-lg-3 col-sm-12 hotelCard"
            style={this.styles.card}
            onClick={() => this.getHotels(this.state.lat, this.state.lon)}
          >
            <div className="card-body">
              <h3 className="card-title text-center">Lodging</h3>
              <p className="card-text text-center">
                Hotel, Motel, Hostels & Inns
              </p>
              <i
                className="fas fa-h-square fa-5x"
                style={this.styles.hotelIcon}
              />
            </div>
          </div>
          {/* Sights Card */}
          <div
            className="card text-white bg-dark mb-3 col-md-3 col-lg-3 col-sm-12 sightsCard"
            style={this.styles.card}
            onClick={() => this.getSights(this.state.lat, this.state.lon)}
          >
            <div className="card-body">
              <h3 className="card-title text-center">Sights & Sounds</h3>
              <p className="card-text text-center">Go Ahead, Be a Tourist</p>
              <i
                className="fas fa-camera-retro fa-5x col-lg-12 col-md-12"
                style={this.styles.cameraIcon}
              />
            </div>
          </div>

          {/* Drinks Card */}
          <div
            className="card text-white bg-dark mb-3 col-md-3 col-lg-3 col-sm-12 drinkCard"
            style={this.styles.card}
            onClick={() => this.getDrinks(this.state.lat, this.state.lon)}
          >
            <div className="card-body">
              <h3 className="card-title text-center">Eat, Drink, Do</h3>
              <p className="card-text text-center">Live It Up Like a Local</p>
              <i className="fas fa-beer fa-5x" style={this.styles.beerIcon} />
            </div>
          </div>
        </div>

        {/* Where Hotels gets rendered */}
        <div className="hotelsDiv">
          {this.state.hotelClick ? this.renderHotels(this.state.hotelObj) : " "}
        </div>

        {/* Where Sights gets rendered */}
        <div className="sightsDiv">
          {this.state.sightsClick ? (
            <Sights
              museum={this.state.museumObj}
              landmark={this.state.landmarkObj}
              active={this.state.activeObj}
            />
          ) : (
            " "
          )}
          {/* Where Drinks gets rendered */}
        </div>
        <div className="drinksDiv">
          {this.state.drinksClick ? (
            <Nightlife
              restaurant={this.state.restaurantObj}
              events={this.state.eventObj}
            />
          ) : (
            " "
          )}
        </div>
      </div>
    );
  }
}

export default Cities;
