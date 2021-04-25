import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';

export const ShowOrganization = () => {
    let { id } = useParams();
    const orgData = useSelector(state => state.organizationState)
    const org = orgData.organizations.find((org) => org.id == id);
    console.log('org', org)

    return (
        <div>Show Org: {id} {org}</div>
    )
}