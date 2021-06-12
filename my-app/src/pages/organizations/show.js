import { useParams, useHistory } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { fetchFields } from "../../features/fields/fieldSlice";
import { fetchOrganizations } from "../../features/organizations/organizationSlice";
import Table from "../../components/table";
import Title from "../../components/title";
import Layout from "../../components/layout";

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  hero: {
    padding: theme.spacing(4),
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "auto",
    flexDirection: "column",
    backgroundColor: theme.palette.background.light,
    borderBottom: `1px solid ${theme.palette.border.light}`,
  },
  tableLink: {
    cursor: "pointer",
  },
  title: {
    color: theme.palette.background.dark,
    fontSize: "39px",
    fontWeight: 100,
  },
}));

const ShowOrganization = () => {
  const history = useHistory();
  const classes = useStyles();
  const dispatch = useDispatch();
  const { id } = useParams();
  const fieldData = useSelector((state) => state.fieldState);
  const orgData = useSelector((state) => state.organizationState);
  const [field, setField] = useState(null);

  useEffect(() => {
    if (fieldData.status === "idle") {
      dispatch(fetchFields());
    } else if (orgData.status === "idle") {
      dispatch(fetchOrganizations());
    }
  }, [orgData.status, fieldData.status, dispatch]);

  const setFieldById = (fieldId) => {
    const field = fieldData.fields.find((f) => f.id === fieldId);
    setField(field);
  };

  const goToField = (fieldId) => {
    setFieldById(id);
    history.push(`/fields/${fieldId}`);
  };

  const fields = fieldData.fields.map((field) => ({
    id: field.id,
    rows: [
      {
        name: "Name",
        value: field.name,
        align: "left",
      },
      {
        name: "Address",
        value: field.address,
        align: "left",
      },
      {
        name: "Address1",
        value: field.address1,
        align: "left",
      },
      {
        name: "City",
        value: field.city,
      },
      {
        name: "State",
        value: field.state,
      },
      {
        name: "zipCode",
        value: field.zip,
      },
      {
        name: "is_active",
        value: "true",
        align: "right",
      },
    ],
  }));

  const org = orgData.organizations.find((o) => o.id === id);
  console.log("fieldData", fieldData);

  if (
    fieldData.status === "loading" ||
    fieldData.status === "idle" ||
    orgData.status === "loading" ||
    orgData.status === "idle"
  ) {
    return <div style={{ padding: "30px" }}>Loading...</div>;
  }
  return (
    <Layout
      hero={
        <div className={classes.hero}>
          <Typography
            className={classes.title}
            component="h1"
            variant="h5"
            color="primary"
            gutterBottom
          >
            {org.name}
          </Typography>
        </div>
      }
    >
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Title>Fields</Title>
          <Table
            status={fieldData.status}
            rows={fields}
            goToItem={goToField}
            headerColumns={[
              { name: "Name" },
              { name: "Street" },
              { name: "Street1" },
              { name: "City" },
              { name: "State" },
              { name: "Zip Code" },
              { name: "Status", align: "right" },
            ]}
          />
        </Grid>
      </Grid>
    </Layout>
  );
};

export default ShowOrganization;
