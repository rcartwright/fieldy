import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { fetchUsers } from "../../features/users/userSlice";
import Layout from "../../components/layout";
import Title from "../../components/title";


const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column"
  }
}));

function DenseTable({ users }) {
  const classes = useStyles();

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Paper className={classes.paper}>
          <Title>Users</Title>
          <Table
            className={classes.table}
            size="small"
            aria-label="users table"
          >
            <TableHead>
              <TableRow>
                <TableCell fontWeight="fontWeightBold" variant="head">
                  Name
                </TableCell>
                <TableCell>Email</TableCell>
                <TableCell align="right">Active?</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((row) => (
                <TableRow key={row.email}>
                  <TableCell component="th" scope="row">
                    Rachel
                  </TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell align="right">
                    {/* eslint-disable-next-line */}
                    {row.is_active?.toString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </Grid>
    </Grid>
  );
}

const Users = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userState);

  useEffect(() => {
    if (userData.status === "idle") {
      dispatch(fetchUsers());
    }
  }, [userData.status, dispatch]);

  let content;
  if (userData.status === "loading") {
    content = <div>Loading...</div>;
  } else if (userData.status === "success") {
    console.log("userData.users", userData.users);
    content = <DenseTable users={userData.users} />;
  } else if (userData.status === "error") {
    content = <div>{userData.error}</div>;
  }

  return <Layout>{content}</Layout>;
};

export default Users;
