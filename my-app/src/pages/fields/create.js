import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  useHistory,
} from "react-router-dom";
import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { TextField, Button, Container, CssBaseline } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Layout from "../../components/layout.js";
import { fetchFields } from "../../features/fields/fieldSlice";
import { fetchOrganizations } from "../../features/organizations/organizationSlice";
import Table from "../../components/table";
import Title from "../../components/title";

const useStyles = makeStyles((theme) => ({
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
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
}));

export const ShowField = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { id } = useParams();
  const fieldData = useSelector((state) => state.fieldState);
  const orgData = useSelector((state) => state.organizationState);

  useEffect(() => {
    if (fieldData.status === "idle") {
      dispatch(fetchFields());
    } else if (orgData.status === "idle") {
      dispatch(fetchOrganizations());
    }
  }, [orgData.status, fieldData.status, dispatch]);

  const field = fieldData.fields.find((field) => field.id == id);
  console.log("field", field);

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
            {field.name}
          </Typography>
        </div>
      }
    >
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Paper className={classes.paper}>
          <Title>Add Field</Title>
          <Formik
            initialValues={{ email: "", password: "" }}
            validate={(values) => {
              const errors = {};
              if (!values.email) {
                errors.email = "Required";
              } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
              ) {
                errors.email = "Invalid email address";
              }
              return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
              JSON.stringify(values, null, 2);
              setTimeout(() => {
                alert(JSON.stringify(values, null, 2));
                setSubmitting(false);
              }, 400);
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
              /* and other goodies */
            }) => (
              <form className={classes.form} onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      id="outlined-basic"
                      label="Name"
                      variant="outlined"
                      name="name"
                      size="large"
                      margin="normal"
                      required
                      fullWidth
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.name}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      id="outlined-basic"
                      label="Street"
                      variant="outlined"
                      name="street"
                      size="large"
                      margin="normal"
                      fullWidth
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.street}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      id="outlined-basic"
                      label="Street1"
                      variant="outlined"
                      name="street1"
                      size="large"
                      margin="normal"
                      fullWidth
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.street1}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      id="outlined-basic"
                      label="City"
                      variant="outlined"
                      name="city"
                      size="large"
                      margin="normal"
                      fullWidth
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.city}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      id="outlined-basic"
                      label="State"
                      variant="outlined"
                      name="state"
                      size="large"
                      margin="normal"
                      fullWidth
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.state}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      id="outlined-basic"
                      label="Zip Code"
                      variant="outlined"
                      name="zip"
                      size="large"
                      margin="normal"
                      fullWidth
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.zip}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    {errors.name && touched.name && errors.name}
                    {errors.street && touched.street && errors.street}
                    <Button
                      variant="contained"
                      color="primary"
                      type="submit"
                      disabled={isSubmitting}
                    >
                      Submit
                    </Button>
                  </Grid>
                </Grid>
              </form>
            )}
          </Formik>
        </Paper>
      </Container>
    </Layout>
  );
};
