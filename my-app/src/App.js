import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Users from "./pages/users/users";
import Organizations from "./pages/organizations/index";
import ShowOrganization from "./pages/organizations/show";
import ShowField from "./pages/fields/show";
import CreateField from "./pages/fields/create";
import "./App.css";

export default function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/users" component={Users} />
        <Route exact path="/organizations" component={Organizations} />
        <Route
          path="/organizations/:id/fields/create"
          render={(props) => <CreateField {...props} />}
          component={CreateField}
        />
        <Route path="/organizations/:id" component={ShowOrganization} />
        <Route
          path="/organizations/:id/fields/:fieldId"
          render={(props) => <ShowField {...props} />}
        />
      </Switch>
    </Router>
  );
}
