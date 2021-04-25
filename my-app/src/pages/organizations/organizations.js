import React, { useEffect, useState } from 'react'
import { fetchOrganizations } from './../../features/organizations/organizationSlice';
import { useSelector, useDispatch } from 'react-redux';
import Layout from '../../components/layout.js'
import Title from '../../components/title';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import ListItem from '@material-ui/core/ListItem';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
  useLocation
} from "react-router-dom";


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

export const Organizations = () => {
  let history = useHistory();
  const classes = useStyles();
  const dispatch = useDispatch();
  const orgData = useSelector(state => state.organizationState)

  useEffect(() => {
      if (orgData.status === 'idle') {
          dispatch(fetchOrganizations())
      }
  }, [orgData.status, dispatch])

  const [organization, setOrganization] = useState(null);

  const setOrgById = (id) => {
    console.log('id', id)
    console.log('orgData.organizations', orgData.organizations)
    const org = orgData.organizations.find(id);
    console.log('org', org)
    setOrganization(org);
  }

  const clearOrg = () => {
    setOrganization(null);
  }
  
  const goToOrg = (id) => {
    setOrgById(id)
    history.push(`/organizations/${id}`)
  }

  const showTableContent = () => {
    if (orgData.status === 'loading') {
        return <div style={{padding: '30px'}}>Loading...</div>;
    } else if (orgData.status === 'success') {
      return (
        <Table className={classes.table} size="small" aria-label="organizations table">
          <TableHead>
            <TableRow>
              <TableCell fontWeight="fontWeightBold" variant="head">Name</TableCell>
              <TableCell align="right">Active?</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orgData.organizations.map((row) => (
              <TableRow 
                className={classes.tableLink}
                key={row.id} 
                hover
                onClick={(event) => goToOrg(row.id)}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.is_active?.toString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )
    } else if (orgData.status === 'error') {
        return <div>{orgData.error}</div>;
    }
  }

  return (
    <Layout>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Title>Organizations</Title>
            {showTableContent()}
          </Paper>
        </Grid>
      </Grid>
    </Layout>
  );
}


// export function Organizations() {
//     const dispatch = useDispatch();
//     const orgData = useSelector(state => state.organizationState)

//     useEffect(() => {
//         if (orgData.status === 'idle') {
//             dispatch(fetchOrganizations())
//         }
//     }, [orgData.status, dispatch])

//     let content;
//     if (orgData.status === 'loading') {
//         content = <div>Loading...</div>;
//     } else if (orgData.status === 'success') {
//         console.log('orgData.users', orgData.organizations)
//         content = <OrgTable organizations={orgData.organizations} />;
//     } else if (orgData.status === 'error') {
//         content = <div>{orgData.error}</div>;
//     }

//     return <Layout>{content}</Layout>
// }