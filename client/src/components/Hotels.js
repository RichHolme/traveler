import React, { Component } from "react";
import axios from "axios";
import { OverlayTrigger, Popover } from "react-bootstrap";
let userId = localStorage.getItem("userId");
let legId = localStorage.getItem("tripLegId");
console.log("legId " + legId);

const styles = {
  card: {
    width: "18rem",
    margin: 20,
    // border: "2px solid black",
    // borderWidth: 7,
    // borderRadius: "5px",
    // boxShadow: "0 7px 8px 0 rgba(0,0,0,0.2)",
    boxShadow: "1px 3px 8px 1px #888888"
    // transition: "0.3s"
  },
  icon: {
    height: 50,
    width: 50,
    position: "relative",
    top: 20
  },
  rating: {
    paddingLeft: 80
  },
  header: {
    boxShadow: "1px 1px 4px 1px #888888"
  },
  button: {
    background: "black",
    color: "white",
    boxShadow: "1px 1px 4px 1px #888888",
    opacity: "10"
  },
  img: {
    height: "25px",
    width: "25px",
    borderRadius: "50%"
  }
};

const popoverClick = (
  <Popover id="popover-trigger-click">
    Add this to your trip!.
  </Popover>
);


class Hotels extends Component {

  state= {
    guests: []
  }

  componentDidMount(){
    // this.props.hotelId.map( id => {
      axios
      .get("/api/shelter/getHotelGuests/" + this.props.hotelId)
      .then(response => {
        console.log(response);
        this.setState({ guests: response.data[0] ? response.data[0].guests : []})
        // this.setState({
        //   trip: response.data,
        //   tripLegs: response.data.tripLegs
        // });
      })
      .catch(function(error) {
        console.log("Error: " + error);
      });

    // })
    // console.log(this.props.ho);
  }

  sendHotel = (name, address, key) => {
    console.log("click seen on Hotel");
    console.log(name, address, "Key:", key);

    axios
      .post("/api/trips/addShelter/" + legId, {
        name: name,
        address: address,
        hotelId: key
      })
      .then(function(response) {
        console.log(response);
        axios
          .put("/api/shelter/addGuest/" + userId + "/" + key,{
            name: name,
            address: address,
            hotelId: key,
          })

          .then(function(response) {
            console.log(response);
          })
          .catch(function(error) {
            console.log("Err - " + error);
          });
      })
      .catch(function(error) {
        console.log("Err - " + error);
      });
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          <div
            className="card col-md-12 col-sm-12 col-xs-12"
            style={styles.card}
          >
            <div className="row">
              <img
                src={this.props.icon}
                alt="hotelIcon"
                style={styles.icon}
                className="col-md-1 col-sm-2 col-xs-2"
              />
              <div
                className="card-header col-md-11 col-sm-10 col-xs-10"
                style={styles.header}
              >
                <h2 id={this.props.name}>{this.props.name}</h2>
                <h4 id={this.props.address}>{this.props.address}</h4>
              </div>
            </div>
            <div className="card-body text-dark">
              <h3 className="card-title" style={styles.rating}>
                Rating:{" "}
                {this.props.rating ? this.props.rating : "None Provided"}
              </h3>
              <p className="card-text text-left" style={styles.rating}>
                {/* <img style={styles.img} src="https://image.freepik.com/free-icon/user-image-with-black-background_318-34564.jpg"></img> */}
                {this.state.guests.map(guest => {
                  return ( <span><img style={styles.img} src={guest.thumbnail}></img> {guest.name} </span>)
                  }
                )}
              </p>
            </div>
            <OverlayTrigger trigger={['hover', 'click']} placement="bottom" overlay={popoverClick}>
            <button
              type="submit"
              data-id={this.props.hotelId}
              style={styles.button}
              className="btn addBtn"
              dataname={this.props.name}
              dataaddress={this.props.address}
              onClick={() =>
                this.sendHotel(
                  this.props.name,
                  this.props.address,
                  this.props.hotelId
                )
              }
              // {((e) => this.handleClick(e, data)) }
            >
              Add to My Path
            </button>
            </OverlayTrigger>
            {this.props.photo ? (
              <a href={this.props.photo} target="_blank" alt="hotelMap">
                <button
                  style={styles.button}
                  type="button"
                  href={this.props.photo}
                  className="btn mapBtn"
                >
                  View on Google Maps
                </button>
              </a>
            ) : (
              " "
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Hotels;
