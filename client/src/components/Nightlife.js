import React, { Component } from "react";
import Restaurant from "./Restaurant";
import Event from "./Event";
import moment from "moment";

const Nightlife = props => {
  const styles = {
    tabs: {
      fontSize: 20,
      textAlign: "center"
    }
  };

  const renderRestaurant = () => {
    return (
      <div>
        {props.restaurant.slice(0, 8).map(food => {
          let href;
          food.photos
            ? (href = food.photos[0].html_attributions[0])
            : "no photo";
          const thisHref = href
            ? href.match(/\".*\"/)[0].replace(/\"/g, "")
            : null;

          return (
            <Restaurant
              name={food.name}
              open={food.opening_hours.open_now}
              icon={food.icon}
              photo={thisHref}
              price={food.price_level}
              rating={food.rating}
              types={food.types}
              address={food.vicinity}
              key={food.id}
              restaurantId={food.id}
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
            id="restaurant-tab"
            data-toggle="tab"
            href="#restaurant"
            role="tab"
            aria-controls="restaurant"
            aria-selected="true"
            onClick={() => renderRestaurant()}
          >
            <i className="fas fa-utensils" /> Food & Drink
            <i className="fas fa-glass-martini" />
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
      </ul>
      <div className="tab-content" id="myTabContent">
        <div
          className="tab-pane fade show active"
          id="restaurant"
          role="tabpanel"
          aria-labelledby="restaurant-tab"
        >
          <h1 className="text-center">Eat Well. Drink Better</h1>
          {renderRestaurant(props.restaurant)}
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
      </div>
    </div>
  );
};

export default Nightlife;
