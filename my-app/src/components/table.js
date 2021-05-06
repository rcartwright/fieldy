import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import Layout from './layout.js'
import Title from './title';
import { makeStyles } from '@material-ui/core/styles';
import MUITable from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableContainer from '@material-ui/core/TableContainer';
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
  },
  tableCell: {
    fontWeight: '600',
    background: '#fafafa',
    padding: '10px 16px'
  }
}));

const Table = (
 { rows,
  headerColumns,
  status,
  error,
  setItemById,
  clearItem,
  goToItem }
) => {
      console.log('rows', rows)
    console.log('hearderCol', headerColumns)

  const ShowTableContent = (rows, headerColumns) => {
    const classes = useStyles();
    console.log('rows', rows)
    console.log('hearderCol', headerColumns)

    if (status === 'loading') {
        return <div style={{padding: '30px'}}>Loading...</div>;
    } else if (status === 'success') {
      return (
        <MUITable className={classes.table} size="medium" aria-label="organizations table">
          <TableHead>
            <TableRow>
              <TableCell className={classes.tableCell}>name</TableCell>
              {
                ([{name: 'hey'}]).map((col) => {
                  <TableCell className={classes.tableCell}>{col.name}</TableCell>
                })
              }
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow 
                className={classes.tableLink}
                key={row.id} 
                hover
                onClick={(event) => goToItem(row.id)}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.is_active?.toString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </MUITable>
      )
    } else if (status === 'error') {
        return <div>{error}</div>;
    }
  }

  return (
    <TableContainer component={Paper}>
      {ShowTableContent(rows, headerColumns)}
    </TableContainer>
  );
}

export default Table