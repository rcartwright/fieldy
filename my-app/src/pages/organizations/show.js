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
    const organization = useSelector(state => state.organizations[id]);

    return (
        <div>Show Org: {organization}</div>
    )
}