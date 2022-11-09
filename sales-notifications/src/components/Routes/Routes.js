import React from "react";
import {Switch, Route, BrowserRouter} from "react-router-dom";
import HomePage from "../Pages/HomePage"
import Notifications from "../Pages/Notifications";
import Settings from "../Pages/Settings";

function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path='/home' component={HomePage}></Route>
                <Route exact path='/notifications' component={Notifications}></Route>
                <Route exact path='/settings' component={Settings}></Route>
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;