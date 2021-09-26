import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import {
  useHistory,
} from "react-router-dom";
import { fetchOrganizations } from "../../features/organizations/organizationSlice";
import { resetFields } from "../../features/fields/fieldSlice";
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

const Organizations = () => {
  const history = useHistory();
  const classes = useStyles();
  const dispatch = useDispatch();
  const orgData = useSelector((state) => state.organizationState);

  useEffect(() => {
    // reset fields when going back to org page
    dispatch(resetFields());
    if (orgData.status === "idle") {
      dispatch(fetchOrganizations());
    }
  }, [orgData.status, dispatch]);

 // const [organization, setOrganization] = useState(null);

  // const setOrgById = (id) => {
  //   const org = orgData.organizations.find((_org) => _org.id === id);
  //   setOrganization(org);
  // };

  // const clearOrg = () => {
  //   setOrganization(null);
  // };

  const goToOrg = (id) => {
    // setOrgById(id);
    history.push(`/organizations/${id}`);
  };

  const showTableContent = () => {
    if (orgData.status === "loading") {
      (
        <div style={{ padding: "30px" }}>Loading...</div>
      )
    } else if (orgData.status === "success") {
      return (
        <Table
          className={classes.table}
          size="medium"
          aria-label="organizations table"
        >
          <TableHead>
            <TableRow>
              <TableCell
                className={classes.tableCell}
                fontWeight="fontWeightBold"
                variant="head"
              >
                Name
              </TableCell>
              <TableCell className={classes.tableCell} align="right">
                Active?
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orgData.organizations.map((row) => (
              <TableRow
                className={classes.tableLink}
                key={row.id}
                hover
                onClick={() => goToOrg(row.id)}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.is_active?.toString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      );
    } else if (orgData.status === "error") {
      return <div>{orgData.error}</div>;
    }
    return null;
  };

  return (
    <Layout>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Title>Your Organizations</Title>
          <TableContainer component={Paper}>
            {showTableContent()}
          </TableContainer>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default Organizations;
