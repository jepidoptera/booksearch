import React from "react";
import "./style.css";

function Nav(props) {
    return (
        <nav className="customNav">
            <a style={{ "display": "inline-block", "color": "white" }} href="/">
                The Searcher of Books
            </a>
            <button className="navButton" onClick={() => changePage(props.selected)}>
                {props.selected === "search"
                    ? "Saved"
                    : "Search"
                }
            </button>
        </nav>
    );
}
function changePage(currentPage) {
    // whichever page we're on, go to the other one
    window.location.href = (currentPage === "search"
        ? "/saved" 
        : "/search"
    )
}
export default Nav;
