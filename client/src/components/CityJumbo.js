import React, { Component } from "react";
import cityPicApi from "../utils/cityPicApi";
import Weather from "./Weather";

class CityJumbo extends Component {
  state = {
    city: "",
    cityPic: ""
  };

  styles = {
    img: {
      height: "300px",
      width: "100%",
      img: "1px solid black",
      boxShadow: "1px 3px 8px 1px #888888",
      marginTop: "-20px",
      marginBottom: "-50px"
    },
    cityText: {
      color: "white",
      fontSize: 100,
      textShadow: "4px 4px black",
      position: "relative",
      bottom: "225px"
    }
  };

  componentDidMount() {
    const city = this.props.city;
    // console.log(city);
    let cityLower = city.toLowerCase();
    if (cityLower === "san francisco") {
      cityLower = "san francisco bay area";
    } else if (cityLower === "wasington, d.c.") {
      cityLower = "washington d.c.";
    }
    const cityDashes = cityLower.replace(/\s+/g, "-");

    this.getCityPic(cityDashes);
  }

  getCityPic = city => {
    cityPicApi
      .cityPic(city)
      .then(data => this.setState({ cityPic: data.data.photos[0].image.web }))
      // .then(console.log(this.state.cityPic))
      .catch(err => console.log(err));
  };

  render() {
    // const imgStyle = { backgroundImage: `url(${this.state.cityPic})` };
    // return (
    //   <div className="jumbotron jumbotron-fluid" style={imgStyle}>
    //     <div className="container">
    //       <h1 className="display-4 text-center" style={this.styles.cityText}>
    //         {this.props.city}
    //       </h1>
    //     </div>
    //   </div>
    // );
    return(
      <div>
          <img
              style={this.styles.img}
              src={this.state.cityPic}
              
          />
          <h1 className="display-4 text-center" style={this.styles.cityText}>
             {this.props.city}
           </h1>
      </div>
  )
  }
}

export default CityJumbo;
