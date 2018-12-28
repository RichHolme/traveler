import React, { Component } from "react";

const styles = {
    li: {
        border: "1px solid black",
        borderRadius: "5px",
        textAlign: "center",
        margin: "3px",
        marginTop: "10px",
        marginBottom: "5px",
        background: "black",
        marginRight: "30px",
        marginLeft: "-20px",
        color: "white",
        fontWeight: "normal",
        fontSize: "20px",
        boxShadow: "1px 3px 8px 1px #888888"
      },
      ulNest: {
        marginRight: "25px"
      },
      liNest: {
        border: "2px solid black",
        borderRadius: "5px",
        // textAlign: "center",
        margin: "3px",
        marginRight: "30px",
        marginLeft: "-20px",
        // background: "black",
        // color: "white",
        fontWeight: "normal",
        fontSize: "20px",
        listStyleType: "none",
        paddingLeft: "10px",
        boxShadow: "1px 3px 8px 1px #888888"
      },
      span: {
        // textAlign: "left"
        float: "left",
        // marginLeft: "10px",
        marginTop: "3px",
        marginRight: "10px"
      }
}

const Hotels = props => {
    
        return(
              <div className="row">
                <ul>
                  <li style={styles.li}>{props.name}</li>
                  <ul style={styles.ulNest}>
                    {/* <li style={styles.liNest}>
                      <span
                        style={styles.span}
                        className="fa fa-calendar-check-o"
                      />{props.date}
                    </li> */}
                    <li style={styles.liNest}>
                      <span
                        style={styles.span}
                        className="fa fa-map-marker"
                      />{props.location}
                    </li>
                  </ul>
                </ul>
              </div>
        )
}

export default Hotels;