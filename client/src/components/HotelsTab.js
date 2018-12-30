import React, { Component } from "react";
import Hotels from "./Hotels";
// import moment from "moment";

const HotlesTab = props => {
  const styles = {
    tabs: {
      fontSize: 20,
      textAlign: "center"
    }
  };

  const renderHotels = hotelObj => {
    return (
      <div>
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
            id="hotel-tab"
            data-toggle="tab"
            href="#hotel"
            role="tab"
            aria-controls="hotel"
            aria-selected="true"
            onClick={() => renderHotels()}
          >
            <i className="fas fa-battery-quarter" /> Lodging
            {/* <i className="fas fa-glass-martini" /> */}
          </a>
        </li>
      </ul>
      <div className="tab-content" id="myTabContent">
        <div
          className="tab-pane fade show active"
          id="hotel"
          role="tabpanel"
          aria-labelledby="restaurant-tab"
        >
          <h1 className="text-center">Recharge Your Batteries</h1>
          {renderHotels(props.hotels)}
        </div>
       
      </div>
    </div>
  );
};

export default HotlesTab;
