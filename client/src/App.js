import React from "react";
import Saved from "./pages/Saved";
import Search from "./pages/Search";
import NoMatch from "./pages/NoMatch";
import Nav from "./components/Nav";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

function App() {
    return (
        <Router>
        <div>
        <Nav />
            <Switch>
                <Route exact path="/" component={Search}></Route>
                <Route exact path="/search" component={Search}></Route>
                <Route exact path="/saved" component={Saved}></Route>
                <Route component={NoMatch}></Route>
            </Switch>
        </div>
        </Router>
    );
}

export default App;
