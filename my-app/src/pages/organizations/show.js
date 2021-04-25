import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";
import React, { useEffect, useState } from 'react'
import { fetchOrganizations } from './../../features/organizations/organizationSlice';
import { useSelector, useDispatch } from 'react-redux';

export const ShowOrganization = () => {
    const dispatch = useDispatch();
    let { id } = useParams();
    const orgData = useSelector(state => state.organizationState)
    console.log('orgData', orgData)

    useEffect(() => {
      if (orgData.status === 'idle') {
        dispatch(fetchOrganizations())
      }
    }, [orgData.status, dispatch])

    const org = orgData.organizations.find((org) => org.id == id);
    console.log('org', org)

    if (orgData.status === 'loading' || orgData.status === 'idle') {
        return <div style={{padding: '30px'}}>Loading...</div>;
    }
    return (
        <div>Show Org: {id} {org.name}</div>
    )
}