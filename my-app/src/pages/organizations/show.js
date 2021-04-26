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
import Typography from '@material-ui/core/Typography';


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
  hero: {
    padding: theme.spacing(4),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'auto',
    flexDirection: 'column',
    backgroundColor: theme.palette.background.light,
    borderBottom: `1px solid ${theme.palette.border.light}`
  },
  tableLink: {
    cursor: 'pointer'
  },
  title: {
    color: theme.palette.background.dark,
    fontSize: '39px',
    fontWeight: 100,
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
        <Layout 
          hero= {
            <div className={classes.hero}>
              <Typography className={classes.title} component="h1" variant="h5" color="primary" gutterBottom>
                {org.name}
              </Typography>
            </div>
          }
        >
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <Title>Fields</Title>
              </Paper>
            </Grid>
          </Grid>
        </Layout>
    )
}