import React, { useState } from "react";

import { Formik, Form } from "formik";
import * as Yup from "yup";

import MyTextInput from "./MyTextInput";

import { Grid, Paper, Avatar, Button, Typography } from "@material-ui/core";

import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import useStyles from "./style";

const youpSchema = Yup.object({
  login: Yup.string().required("Required!"),
  password: Yup.string()
    .min(8, "Minimum 8 characters")
    .required("Required !")
});

const LoginTemplate = () => {
  const { root, image, paper, avatar, form } = useStyles();

  const [formData, setFormData] = useState();

  return (
    <Grid container className={root} component="main">
      <Grid item xs={false} sm={4} md={7} className={image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6}>
        <div className={paper}>
          <Avatar className={avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography color="primary" variant="h5">
            Sign In
          </Typography>
          <Formik
            initialValues={{
              login: "",
              password: ""
            }}
            validationSchema={youpSchema}
            onSubmit={values => {
              setFormData(values);
            }}
          >
            <Form className={form}>
              <MyTextInput
                label="login"
                name="login"
                type="text"
                placeholder="Mlekoslaw@interia.pl"
              />
              <MyTextInput
                label="password"
                name="password"
                type="password"
                placeholder="write a password"
              />
              <Button
                style={{ marginTop: "2em" }}
                variant="contained"
                color="primary"
                size="large"
                type="submit"
              >
                Submit
              </Button>
              <Button
                style={{ marginTop: "2em" }}
                variant="contained"
                color="primary"
                size="large"
                type="submit"
                href="/"
              >
                Back
              </Button>
            </Form>
          </Formik>
        </div>
      </Grid>
    </Grid>
  );
};

export default LoginTemplate;
