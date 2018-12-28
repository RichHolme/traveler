import React, { Component } from "react";


const Col = props => {
        return (
            <div className="col-md-4">{props.children}</div>
        )
    }

export default Col;