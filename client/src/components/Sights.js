import React, { Component } from "react";
import Museums from "./Museums";
import Landmarks from "./Landmarks";
import Active from "./Active";

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

  //A funciton to render landmarks found by the API to the page//
  const renderLandmark = () => {
    return (
      <div>
        {props.landmark.slice(0, 8).map(landmark => {
          return (
            <Landmarks
              name={landmark.Location.Name}
              address={landmark.Location.Address.Label}
              type={landmark.Location.LocationType}
              lat={landmark.Location.DisplayPosition.Latitude}
              lon={landmark.Location.DisplayPosition.Longitude}
              key={landmark.Location.LocationId}
              landmarkId={landmark.Location.LocationId}
            />
          );
        })}
      </div>
    );
  };

  const renderActive = () => {
    return (
      <div>
        {props.active.slice(0, 8).map(act => {
          //   console.log(act.assetDescriptions[0]);
          //   console.log(act.assetDescriptions[0]);
          let href;
          act.assetDescriptions[0]
            ? (href = act.assetDescriptions[0].description)
            : (href = "No Description Provided");

          console.log(href);
          //   const thisHref = href
          //     ? href.match(/\".*\"/)[0].replace(/\"/g, "")
          //     : null;
          return (
            <Active
              description={href}
              endDate={act.activityEndDate}
              startDate={act.activityStartDate}
              address={act.place.addressLine1Txt}
              city={act.place.cityName}
              state={act.place.stateProvinceCode}
              country={act.place.countryCode}
              zip={act.place.postalCode}
              latLon={act.place.geoPoint}
              tktsRemain={act.assetQuantity.availableCnt}
              tktsSold={act.assetQuantity.soldCnt}
              capacity={act.assetQuantity.capacityNb}
              org={act.organization.organizationName}
              name={act.assetName}
              saleStatus={act.salesStatus}
              key={act.assetGuid}
              activeId={act.assetGuid}
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
            Museums
          </a>
        </li>
        <li className="nav-item">
          <a
            className="nav-link"
            id="landmark-tab"
            data-toggle="tab"
            href="#landmark"
            role="tab"
            aria-controls="landmark"
            aria-selected="false"
            onClick={() => renderLandmark()}
          >
            Landmarks
          </a>
        </li>
        <li className="nav-item">
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
        </li>
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
          id="landmark"
          role="tabpanel"
          aria-labelledby="landmark-tab"
        >
          <h1 className="text-center">Landmarks to Snap Instagrams Of</h1>
          {renderLandmark(props.landmark)}
        </div>
        <div
          className="tab-pane fade"
          id="active"
          role="tabpanel"
          aria-labelledby="active-tab"
        >
          <h1 className="text-center">Stay Active</h1>
          {renderActive(props.active)}
        </div>
      </div>
    </div>
  );
};

export default Sights;
