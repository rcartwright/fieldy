import React, { useEffect } from 'react'
import { fetchOrganizations } from './../../features/organizations/organizationSlice';
import { useSelector, useDispatch } from 'react-redux';
import Layout from '../../components/layout.js'
import Title from '../../components/title';

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
//import Organizations from './organizations';


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
}));

function DenseTable({organizations}) {
  const classes = useStyles();

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Paper className={classes.paper}>
          <Title>Organizations</Title>
          <Table className={classes.table} size="small" aria-label="organizations table">
            <TableHead>
              <TableRow>
                <TableCell fontWeight="fontWeightBold" variant="head">Name</TableCell>
                <TableCell align="right">Active?</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {organizations.map((row) => (
                <TableRow key={row.id}>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="right">{row.is_active?.toString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </Grid>
    </Grid>
  );
}

function UsersList(props) {
    
}

export function Organizations() {
    const dispatch = useDispatch();
    const orgData = useSelector(state => state.organizationState)

    useEffect(() => {
        if (orgData.status === 'idle') {
            dispatch(fetchOrganizations())
        }
    }, [orgData.status, dispatch])

    let content;
    if (orgData.status === 'loading') {
        content = <div>Loading...</div>;
    } else if (orgData.status === 'success') {
        console.log('orgData.users', orgData.organizations)
        content = <DenseTable organizations={orgData.organizations} />;
    } else if (orgData.status === 'error') {
        content = <div>{orgData.error}</div>;
    }

    return <Layout>{content}</Layout>
}