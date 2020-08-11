import React from "react";
import { BrowserRouter, Route, Redirect, Switch, Link } from "react-router-dom";
import HomeComponent from "./components/HomeComponent";
import ViewComponent from "./components/ViewComponent";
import "./App.css";

function App() {
    return (
        <BrowserRouter>
            <div className="app">
                <div className="header">
                    <Link to="/">
                        <div className="logoContainer">
                            <img className="logo" src="/logo-lg.png" alt="logo"/>
                            <h1>Droppy</h1>
                        </div>
                    </Link>
                </div>
                <Switch>
                    <Route
                        exact
                        path="/"
                        render={props => <HomeComponent {...props} />}
                    />
                    <Route
                        exact
                        path="/view/:id"
                        render={props => <ViewComponent {...props} />}
                    />
                    <Redirect to="/" />
                </Switch>
            </div>
            <div className="footer">
                <p>
                    <a href="https://github.com/n-young/droppy">Source</a>
                </p>
                <p>
                    Designed by <a href="https://n-young.me">Nick Young</a>{" "}
                    © 2020
                </p>
            </div>
        </BrowserRouter>
    );
}

export default App;
