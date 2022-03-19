import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import MUITable from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column"
  },
  tableLink: {
    cursor: "pointer"
  },
  tableCell: {
    fontWeight: "600",
    background: "#fafafa",
    padding: "10px 16px"
  }
}));

const Table = ({
  rows,
  headerColumns,
  status,
  error,
  goToItem
}) => {
  const classes = useStyles();

  const ShowTableContent = () => {
    if (status === "loading" || status === "idle") {
      return (
        <TableRow>
          <TableCell component="th" scope="row">
            Loading...
          </TableCell>
        </TableRow>
      )
    } 
    if (status === "success") {
      return (
        <TableBody>
          {rows.map((row) => (
            <TableRow
              className={classes.tableLink}
              key={row.id}
              hover
              onClick={() => goToItem(row.id)}
            >
              {" "}
              {row.rows.map((column) => 
                <TableCell align={column.align} component="th" scope="row">
                  {column.value}
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      );
    }
    if (status === "error") {
      return <div>{error}</div>;
    }
    return null;
  };

  return (
    <TableContainer component={Paper}>
      <MUITable
        className={classes.table}
        size="medium"
        aria-label="organizations table"
      >
        <TableHead>
          <TableRow>
            {headerColumns.map((col) => (
              <TableCell className={classes.tableCell} align={col.align}>
                {col.name}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        {ShowTableContent()}
      </MUITable>
    </TableContainer>
  );
};

export default Table;
