import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Home from '../loadables/Home';
import Samples from '../loadables/Samples';
import NotFound from '../loadables/NotFound';
import Notifications from "../loadables/Notifications";
import Settings from "../loadables/Settings";

const Routes = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/notifications" component={Notifications} />
    <Route exact path="/settings" component={Settings} />
    <Route path="*" component={NotFound} />
  </Switch>
);

export default Routes;
