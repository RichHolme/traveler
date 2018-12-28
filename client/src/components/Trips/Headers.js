import React, { Component } from "react";

const styles = {
    ul: {
        textAlign: "left",
        listStyleType: "none"
      },
      liTitle: {
        border: "1px solid black",
        borderRadius: "5px",
        paddingLeft: "10px",
        marginTop: "10px",
        marginBottom: "10px",
        background: "black",
        color: "white",
        fontSize: "28px",
        boxShadow: "1px 3px 8px 1px #888888"
      },
      span: {
        float: "left",
        marginTop: "3px",
        marginRight: "10px"
      }
}

class Headers extends Component {
    render () {
        return(
            <div className="row">
                <ul style={styles.ul} className="col-md-4">
                    <li style={styles.liTitle}>
                    <span style={styles.span} className="fa fa-ticket" />Activities
                    </li>
                </ul>
                <ul style={styles.ul} className="col-md-4">
                    <li style={styles.liTitle}>
                    <span style={styles.span} className="fa fa-bed" />Hotels
                    </li>
                </ul>
                <ul style={styles.ul} className="col-md-4">
                    <li style={styles.liTitle}>
                    <span style={styles.span} className="fa fa-cutlery" />Restaurants
                    </li>
                </ul>
            </div>
        )
    }
}

export default Headers;