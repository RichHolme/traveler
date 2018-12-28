import React, { Component } from "react";
import cityPicApi from "../../utils/cityPicApi";
// import Weather from "./Weather";

class Img extends Component {
  state = {
    city: "",
    cityPic: "https://d1hw6n3yxknhky.cloudfront.net/012021977_prevstill.jpeg"
  };

  styles = {
    img: {
        height: "300px",
        width: "100%",
        img: "1px solid black",
        boxShadow: "1px 3px 8px 1px #888888",
        marginTop: "10px",
        marginBottom: "10px"
      }
  };

  componentDidMount() {
    const city = this.props.city;
    console.log(city);
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
      .then(
        (data) => {
          console.log(data)
        if(data.data.photos.length){
          this.setState({ cityPic: data.data.photos[0].image.web })
        }else{
        }
      }
        //  data => data ? this.setState({ cityPic: data.data.photos[0].image.web }) : this.setState({ cityPic: "https://ak3.picdn.net/shutterstock/videos/4757393/thumb/1.jpg"})
      )
      .then(console.log(this.state.cityPic))
      .catch(err => console.log(err));
  };

  render() {
    // const imgStyle = { backgroundImage: `url(${this.state.cityPic})` };
    // return (
    //   <div className="jumbotron jumbotron-fluid" style={imgStyle}>
    //     <div className="container">
    //       {/* <h1 className="display-4 text-center" style={this.styles.cityText}>
    //         {this.props.city}
    //       </h1> */}
    //     </div>
    //   </div>
    // );
    return(
        <div>
            <img
                style={this.styles.img}
                src={this.state.cityPic}
            />
        </div>
    )
  }
}

export default Img;