import React, { Component } from "react";
import Restaurant from "./Restaurant";
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
       
      </div>
    </div>
  );
};

export default Nightlife;
