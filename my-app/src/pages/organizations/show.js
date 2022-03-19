import { useParams, useHistory } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { Button } from "@material-ui/core";
import { fetchFields } from "../../features/fields/fieldSlice";
import { fetchOrganizations } from "../../features/organizations/organizationSlice";
import Table from "../../components/table";
import Title from "../../components/title";
import Layout from "../../components/layout";

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
  hero: {
    padding: theme.spacing(4),
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "auto",
    flexDirection: "column",
    backgroundColor: theme.palette.background.light,
    borderBottom: `1px solid ${theme.palette.border.light}`
  },
  tableLink: {
    cursor: "pointer"
  },
  title: {
    color: theme.palette.background.dark,
    fontSize: "39px",
    fontWeight: 100
  },
  tableHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "end"
  }
}));

const ShowOrganization = () => {
  const history = useHistory();
  const classes = useStyles();
  const dispatch = useDispatch();
  const { id } = useParams();
  const fieldData = useSelector((state) => state.fieldState);
  const orgData = useSelector((state) => state.organizationState);
  // const [field, setField] = useState(null);
  const [paramId] = useState(id);

  useEffect(() => {
    if (fieldData.status === "idle") {
      dispatch(fetchOrganizations());
      dispatch(fetchFields(id));
    }
  }, [paramId]);

  // const setFieldById = (fieldId) => {
  //   const field = fieldData.fields.find((f) => f.id === fieldId);
  //   if (field) {
  //     setField(field);
  //   }
  // };

  const org = orgData.organizations.find((o) => o.id === id);

  const goToField = (fieldId) => {
    // setFieldById(id);
    history.push(`/fields/${fieldId}`);
  };

  const fields = fieldData.fields.map((field) => ({
    id: field.id,
    rows: [
      {
        name: "Name",
        value: field.name,
        align: "left"
      },
      {
        name: "Address",
        value: field.address,
        align: "left"
      },
      {
        name: "Address1",
        value: field.address1,
        align: "left"
      },
      {
        name: "City",
        value: field.city
      },
      {
        name: "State",
        value: field.state
      },
      {
        name: "zipCode",
        value: field.zip
      },
      {
        name: "is_active",
        value: "true",
        align: "right"
      }
    ]
  }));

  console.log("fieldData", fieldData);

  if (fieldData.status === "loading" || orgData.status === "loading") {
    return (
      <Layout>
        <Grid container spacing={3}>
          Loading...
        </Grid>
      </Layout>
    )
  }

  if (!org) {
    return <div>no org</div>;
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
        <Grid item xs={12} className={classes.tableHeader}>
          <Title>Fields</Title>
          <Button
            variant="contained"
            color="primary"
            onClick={() => history.push(`/organizations/${id}/fields/create`)}
          >
            Create
          </Button>
        </Grid>
        <Grid item xs={12}>
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
              { name: "Status", align: "right" }
            ]}
          />
        </Grid>
      </Grid>
    </Layout>
  );
};

export default ShowOrganization;
