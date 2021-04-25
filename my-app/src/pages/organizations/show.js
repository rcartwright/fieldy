import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";
import Title from '../../components/title';
import React, { useEffect, useState } from 'react'
import { fetchOrganizations } from './../../features/organizations/organizationSlice';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Layout from '../../components/layout.js';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';


const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  tableLink: {
    cursor: 'pointer'
  }
}));

export const ShowOrganization = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    let { id } = useParams();
    const orgData = useSelector(state => state.organizationState)

    useEffect(() => {
      if (orgData.status === 'idle') {
        dispatch(fetchOrganizations())
      }
    }, [orgData.status, dispatch])

    const org = orgData.organizations.find((org) => org.id == id);

    if (orgData.status === 'loading' || orgData.status === 'idle') {
        return <div style={{padding: '30px'}}>Loading...</div>;
    }
    return (
        <Layout>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <Title>{org.name}</Title>
              </Paper>
            </Grid>
          </Grid>
        </Layout>
    )
}