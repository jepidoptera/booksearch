import React from "react";
import "./style.css";

// just a bar that pops down from the top and contains a message
export default function (props) {
    return (
        <div id="messageBar">
            {props.message}
        </div>
    )
}
