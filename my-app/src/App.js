import { Users } from './pages/users/users'
import { Organizations } from './pages/organizations/organizations'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';




export default function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/users" component={Users} />
        <Route exact path="/organizations" component={Organizations} />
      </Switch>
    </Router>
  )
}