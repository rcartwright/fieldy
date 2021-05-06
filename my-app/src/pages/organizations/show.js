import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";
import Title from '../../components/title';
import Table from '../../components/table';
import React, { useEffect, useState } from 'react'
import { fetchOrganizations } from './../../features/organizations/organizationSlice';
import { fetchFields } from './../../features/fields/fieldSlice';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
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
    const fieldData = useSelector(state => state.fieldState)
    const orgData = useSelector(state => state.organizationState)

    useEffect(() => {
      if (fieldData.status === 'idle') {
        dispatch(fetchFields())
      } else 
      if (orgData.status === 'idle') {
        dispatch(fetchOrganizations())
      }
    }, [orgData.status, fieldData.status, dispatch])

    const org = orgData.organizations.find((org) => org.id == id);
    console.log('fieldData', fieldData)

    if (
      fieldData.status === 'loading' || 
        fieldData.status === 'idle' || 
        orgData.status === 'loading' || 
        orgData.status === 'idle') {
        return <div style={{padding: '30px'}}>Loading...</div>;
    }
    return (
        <Layout 
          hero={
            <div className={classes.hero}>
              <Typography className={classes.title} component="h1" variant="h5" color="primary" gutterBottom>
                {org.name}
              </Typography>
            </div>
          }
        >
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Title>Fields</Title>
              <Table status={fieldData.status} rows={fieldData.fields} headerColumns={[{name: 'hey'}]} />
            </Grid>
          </Grid>
        </Layout>
    )
}