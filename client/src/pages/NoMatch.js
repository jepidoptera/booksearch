import React from "react";
// import { Col, Row, Container } from "../components/Grid";
// import Jumbotron from "../components/Jumbotron";

function NoMatch() {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className ="col-md-12">
            <h1>404 Page Not Found</h1>
            <h1>
              <span role="img" aria-label="Face With Rolling Eyes Emoji">
                🙄
              </span>
            </h1>
        </div>
      </div>
    </div>
  );
}

export default NoMatch;
