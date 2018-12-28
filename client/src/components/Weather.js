import React from "react";

const Weather = props => {
  const styles = {
    weather: {
      position: "absolute",
      fontSize: 24,
      width: 10,
      right: 300,
      top: 135,
      // background: "rgba(255, 255, 255, .10)",
      // background: "white",
      // display: "inline-block"
      paddingRight: "180px",
      paddingLeft: "10px",
      paddingTop: "0px",
      paddingBottom: "20px",
      borderRadius: "50%",
      // boxShadow: "1px 3px 8px 1px #888888"
    },
    img: { 
      height: 100,
      marginLeft: "4px",
      paddingTop: "-5px" 
    },
    text: {
      position: "absolute",
      top: 60,
      left: 15,
      color: "white",
      textShadow: "2px 2px black",
      textAlign: "center",
      marginLeft: ".01px",
      // marginRight: "5px"
    }
  };
  
  if (props.weather.temp) {
    return (
      <div className="container" style={styles.weather}>
        <div>
          <img src={props.weather.icon} style={styles.img} />
        </div>
        <div className="row" style={styles.text}>
          <div className="conditions">
            {props.weather.conditions}, {props.weather.temp}°{" "}
          </div>
        </div>
      </div>
    );
  }else {
    return null;
  }

};

export default Weather;
