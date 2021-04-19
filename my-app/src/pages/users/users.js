import React, { useEffect } from 'react'
import {fetchUsers, userSlice } from './../../features/users/userSlice';
import { useSelector, useDispatch } from 'react-redux';
import Layout from '../../components/layout.js'

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export default function DenseTable({users}) {
  const classes = useStyles();
  console.log('users', users)

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell align="right">Active?</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                Rachel
              </TableCell>
              <TableCell>{row.email}</TableCell>
              <TableCell align="right">{row.is_active}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

function UsersList(props) {
    
}

export function Users() {
    const dispatch = useDispatch();
    const userData = useSelector(state => state.userState)

    useEffect(() => {
        if (userData.status === 'idle') {
            dispatch(fetchUsers())
        }
    }, [userData.status, dispatch])

    // function showUsers(users) {
    //     return users?.map((user) => {
    //         return user.email;
    //     })
    // }

    let content;
    if (userData.status === 'loading') {
        content = <div>Loading...</div>;
    } else if (userData.status === 'success') {
        console.log('userData.users', userData.users)
        content = <DenseTable users={userData.users} />;
    } else if (userData.status === 'error') {
        content = <div>{userData.error}</div>;
    }

    return <Layout>{content}</Layout>
}



        //   <Grid container spacing={3}>
        //     {/* Chart */}
        //     <Grid item xs={12} md={8} lg={9}>
        //       <Paper className={fixedHeightPaper}>
        //         Chart
        //       </Paper>
        //     </Grid>
        //     {/* Recent Deposits */}
        //     <Grid item xs={12} md={4} lg={3}>
        //       <Paper className={fixedHeightPaper}>
        //         Deposits
        //       </Paper>
        //     </Grid>
        //     {/* Recent Orders */}
        //     <Grid item xs={12}>
        //       <Paper className={classes.paper}>
        //         Orders
        //       </Paper>
        //     </Grid>
        //   </Grid>