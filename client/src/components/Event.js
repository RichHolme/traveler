import moment from "moment";
import React, { Component } from "react";
import axios from "axios";
import { OverlayTrigger, Popover } from "react-bootstrap";
let userId = localStorage.getItem("userId");
let legId = localStorage.getItem("tripLegId");

const styles = {
  card: {
    // margin: 20,
    
    // width: "18rem",
    margin: 20,
    // border: "2px solid black",
    // borderWidth: 7,
    // borderRadius: "5px",
    // boxShadow: "0 7px 8px 0 rgba(0,0,0,0.2)",
    boxShadow: "1px 3px 8px 1px #888888",
    // transition: "0.3s"
  },
  header: {
    boxShadow: "1px 1px 4px 1px #888888",
  },
  button: {
    background: "black",
    color: "white",
    boxShadow: "1px 1px 4px 1px #888888",
    opacity: "10"
  },
  img: {
    height: "20px",
    width: "20px",
    borderRadius: "50%"
  }
};

const popoverClick = (
  <Popover id="popover-trigger-click">
    Add this to your trip!.
  </Popover>
);

class Event extends Component {

  state= {
    guests: [],
    img: "http://frs102.net/wp-content/uploads/2013/06/FRS-102-WHITE-SQUARE.jpg",
    guest2: [],
    img2: "http://frs102.net/wp-content/uploads/2013/06/FRS-102-WHITE-SQUARE.jpg",
    guest3: [],
    img3: "http://frs102.net/wp-content/uploads/2013/06/FRS-102-WHITE-SQUARE.jpg"

  }

  componentDidMount(){
  //   // this.props.hotelId.map( id => {
      axios
      .get("/api/activity/")
      .then(response => {
        console.log(response.data);
        
        response.data.map(event => {
          if(this.props.eventId === event.activityId){
            // console.log(museum.participants[0] + "is here")
            axios
              .get("/api/users/" + event.participants[0])
              .then(response => {
                console.log(response.data)
                this.setState({ guests: response.data.name, img: response.data.thumbnail})
              })
              .catch(function(error) {
                console.log("Error: " + error);
              });

            if(event.participants[1]){
              console.log("two people here")
              axios
              .get("/api/users/" + event.participants[1])
              .then(response => {
                console.log(response.data.name + "is here")
                this.setState({ guest2: response.data.name, img2: response.data.thumbnail})
              })
              .catch(function(error) {
                console.log("Error: " + error);
              });
            }

            if(event.participants[2]){
              // console.log("two people here")
              axios
              .get("/api/users/" + event.participants[2])
              .then(response => {
                console.log(response.data.name + "is here")
                this.setState({ guest3: response.data.name, img3: response.data.thumbnail})
              })
              .catch(function(error) {
                console.log("Error: " + error);
              });
            }
          }
          // console.log(museum.participants[0])
        });
        // this.setState({ guests: response.data[0] ? response.data[0].guests : []})
        // this.setState({
        //   trip: response.data,
        //   tripLegs: response.data.tripLegs
        // });
      })
      .catch(function(error) {
        console.log("Error: " + error);
      });

  //   // })
    // console.log(this.props);
  }

  sendEvent = (name, address, id) => {
    console.log("click works on Event");
    console.log(name, address, id);
  
    axios
      .post("/api/trips/addActivity/" + legId, {
        name: name,
        address: address,
        restaurantBoolean: false,
        activityId: id
      })
      .then(function(res) {
        console.log(res);
      })
      .then(function(err) {
        console.log("error found:  " + err);
      });
  };

  render() {
    return (
      <div
        className="card mb-3 col-lg-12 col-md-12 col-sm-12"
        style={styles.card}
      >
        <div className="card-header" style={styles.header}>
          <h2>{this.props.name}</h2>
          <h5>{this.props.address}</h5>
        </div>
        <div className="card-body text-dark">
          <h3>Time: {this.props.time}</h3>
          {this.props.description !== null ? (
            <p
              className="card-text"
              dangerouslySetInnerHTML={{ __html: this.props.description }}
            />
          ) : (
            <h4 className="card-text">Discover it for yourself!</h4>
          )}
           <p className="card-text text-left" style={styles.rating}>
                {/* <img style={styles.img} src="https://image.freepik.com/free-icon/user-image-with-black-background_318-34564.jpg"></img> */}
              <img style={styles.img} src={this.state.img}></img> {this.state.guests} <img style={styles.img} src={this.state.img2}></img> {this.state.guest2} <img style={styles.img} src={this.state.img3}></img> {this.state.guest3}
            </p>
        </div>
        <OverlayTrigger trigger={['hover', 'click']} placement="bottom" overlay={popoverClick}>
        <button
          type="button"
          style={styles.button}
          className="btn addBtn"
          onClick={() => this.sendEvent(this.props.name, this.props.address, this.props.eventId)}
        >
          Add to My Path
        </button>
        </OverlayTrigger>
        <a href={this.props.link} target="_blank" alt="eventLink">
          <button
            type="button"
            style={styles.button}
            href={this.props.link}
            target="_blank"
            className="btn mapBtn"
          >
            More Information
          </button>
        </a>
      </div>
  )};
};

export default Event;
