import React, { useEffect } from 'react'
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

export const Organizations = ({error, organizations}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const orgData = useSelector(state => state.organizationState)

  useEffect(() => {
      if (orgData.status === 'idle') {
          dispatch(fetchOrganizations())
      }
  }, [orgData.status, dispatch])

  const showTableContent = () => {
    if (orgData.status === 'loading') {
        return <div style={{padding: '30px'}}>Loading...</div>;
    } else if (orgData.status === 'success') {
      const data = orgData.organizations.map((row) => (
        <TableRow key={row.id}>
          <TableCell component="th" scope="row">
            {row.name}
          </TableCell>
          <TableCell align="right">{row.is_active?.toString()}</TableCell>
        </TableRow>
      ))

      return (
        <Table className={classes.table} size="small" aria-label="organizations table">
          <TableHead>
            <TableRow>
              <TableCell fontWeight="fontWeightBold" variant="head">Name</TableCell>
              <TableCell align="right">Active?</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data}
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