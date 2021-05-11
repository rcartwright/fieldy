import { Users } from './pages/users/users'
import { Organizations } from './pages/organizations/organizations'
import { ShowOrganization } from './pages/organizations/show'
import { ShowField } from './pages/fields/show'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';


export default function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/users" component={Users} />
        <Route exact path="/organizations" component={Organizations} />
        <Route path="/organizations/:id" render={props => 
  (<ShowOrganization {...props} pieceOfState={this.state.pieceOfState}/>)
} component={ShowOrganization} />
        <Route path="/fields/:id" render={props =>  (<ShowField {...props} pieceOfState={this.state.pieceOfState}/>)
} component={ShowField} />
      </Switch>
    </Router>
  )
}