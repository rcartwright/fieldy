import { fetchOrganizations } from '../features/organizations/organizationSlice';
import { useSelector, useDispatch, connect } from 'react-redux';
import React, { useEffect, useState } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
  useLocation
} from "react-router-dom";

const OrganizationContainer = () => {
  let history = useHistory();
  const dispatch = useDispatch();
  const orgData = useSelector(state => state.organizationState)

  useEffect(() => {
    if (orgData.status === 'idle') {
      dispatch(fetchOrganizations())
    }
  }, [orgData.status, dispatch])

const [organization, setOrganization] = useState(null);

const setOrgById = (id) => {
  const org = orgData.organizations.find((org) => org.id == id);
  setOrganization(org);
}

const clearOrg = () => {
  setOrganization(null);
}


const mapStateToProps = (state) => {
  return {
    organizations: state.organizations,
    organization: organization
  };
};

export default connect(mapStateToProps, { fetchOrganizations, setOrgById, clearOrg})(OrganizationContainer);