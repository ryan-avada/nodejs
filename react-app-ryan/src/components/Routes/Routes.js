// Routes.js
import React from "react";
import { Switch, Route } from "react-router-dom";

const Products = (
    <h1>Product page</h1>
);
const Settings = (
    <h1>Setting page</h1>
);
const Home = (
    <h1>Home Page</h1>
);

function Routes() {
    return (
        <Switch>
            <Route path="/products">
                <Products />
            </Route>
            <Route path="/settings">
                <Settings />
            </Route>
            <Route path="/home">
                <Home />
            </Route>
        </Switch>
    );
}


export default Routes;