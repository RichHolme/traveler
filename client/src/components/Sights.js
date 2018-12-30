import React, { Component } from "react";
import Museums from "./Museums";
// import Landmarks from "./Landmarks";
// import Active from "./Active";
import Event from "./Event";
// import moment from "Moment.js";
import moment from "moment";

const Sights = props => {
  console.log(props);
  const styles = {
    tabs: {
      fontSize: 20,
      textAlign: "center"
    }
  };
  //A function to render museums found by the API to the page//
  const renderMuseum = () => {
    return (
      <div>
        {props.museum.slice(0, 8).map(museum => {
          let href;
          museum.photos
            ? (href = museum.photos[0].html_attributions[0])
            : "no photo";
          const thisHref = href
            ? href.match(/\".*\"/)[0].replace(/\"/g, "")
            : null;
          return (
            <Museums
              icon={museum.icon}
              name={museum.name}
              address={museum.vicinity}
              rating={museum.rating}
              key={museum.id}
              museumId={museum.id}
              photo={thisHref}
            />
          );
        })}
      </div>
    );
  };

  const renderEvent = () => {
    return (
      <div>
        {props.events.map(event => {
          let address;
          let allDay;
          let picture;
          let stopTime;

          address = `${event.venue_address} ${event.city_name}, ${
            event.region_abbr
          }`;

          event.stop_time === null
            ? (stopTime = "Whenever...")
            : (stopTime = event.stop_time);

          event.all_day === "0" && stopTime === "Whenever..."
            ? (allDay = `${moment(event.start_time).format(
                "MMMM Do YYYY, h:mm a"
              )} - ${stopTime}`)
            : event.all_day === "0" && stopTime !== "Whenever..."
              ? (allDay = `${moment(event.start_time).format(
                  "MMMM Do YYYY, h:mm a"
                )} - ${moment(event.stop_time).format("MMMM Do YYYY, h:mm a")}`)
              : event.all_day === "1"
                ? (allDay = "All Day Event")
                : (allDay = "No Time Specified");

          return (
            <Event
              address={address}
              link={event.url}
              time={allDay}
              name={event.title}
              description={event.description}
              venueName={event.venue_name}
              key={event.id}
              eventId={event.id}
            />
          );
        })}
      </div>
    );
  };

  return (
    <div className="container">
      <ul
        className="nav nav-tabs"
        id="myTab"
        role="tablist"
        style={styles.tabs}
      >
        <li className="nav-item active">
          <a
            className="nav-link"
            id="museum-tab"
            data-toggle="tab"
            href="#museum"
            role="tab"
            aria-controls="museum"
            aria-selected="true"
            onClick={() => renderMuseum()}
          >
            <i className="fas fa-history" /> Museums
          </a>
        </li>
        <li className="nav-item">
          <a
            className="nav-link"
            id="event-tab"
            data-toggle="tab"
            href="#event"
            role="tab"
            aria-controls="event"
            aria-selected="false"
            onClick={() => renderEvent()}
          >
            <i className="far fa-calendar-alt" /> Events{" "}
          </a>
        </li>
        {/* <li className="nav-item">
          <a
            className="nav-link"
            id="active-tab"
            data-toggle="tab"
            href="#active"
            role="tab"
            aria-controls="active"
            aria-selected="false"
            onClick={() => renderActive()}
          >
            Be Active
          </a>
        </li> */}
      </ul>
      <div className="tab-content" id="myTabContent">
        <div
          className="tab-pane fade show active"
          id="museum"
          role="tabpanel"
          aria-labelledby="museum-tab"
        >
          <h1 className="text-center">Museums to Make You Smarter</h1>
          {renderMuseum(props.museum)}
        </div>
        <div
          className="tab-pane fade"
          id="event"
          role="tabpanel"
          aria-labelledby="event-tab"
        >
          <h1 className="text-center">Nightlife, Your Best Life</h1>
          <div className="card-deck">{renderEvent(props.event)}</div>
        </div>
        {/* <div
          className="tab-pane fade"
          id="active"
          role="tabpanel"
          aria-labelledby="active-tab"
        >
          <h1 className="text-center">Stay Active</h1>
          {renderActive(props.active)}
        </div> */}
      </div>
    </div>
  );
};

export default Sights;
