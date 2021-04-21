import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";

export const ShowOrganization = () => {
    let { id } = useParams();
    return (
        <div>Show Org: {id}</div>
    )
}