import React, { useContext } from "react";
import { Link } from "react-router-dom";

import { RentalCarContext } from "../../context/context";

import { Formik, Form } from "formik";
import * as Yup from "yup";

import MyTextInput from "../loginTemplate/MyTextInput";

import { Grid, Paper, Avatar, Button, Typography } from "@material-ui/core";

import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import useStyles from "../loginTemplate/style";

const yupSchema = Yup.object({
  name: Yup.string().required("Required !"),
  surname: Yup.string().required("Required !"),
  password: Yup.string()
    .min(8, "Minimum 8 characters")
    .required("Required !"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Required !")
});

//export const API_URL = "https://cars-renting-server.herokuapp.com/";
//export const API_URL = "http://localhost:8080/";
export const API_URL =
  "http://ec2-35-159-52-215.eu-central-1.compute.amazonaws.com:8080/";

const RegisterTemplate = () => {
  const { root, image, paper, avatar, form, error } = useStyles();

  const { loginResponse, setLoginResponse } = useContext(RentalCarContext);

  const registerUser = async registerData => {
    let formDataPost = new FormData();
    formDataPost.append("username", registerData["name"]);
    formDataPost.append("surname", registerData["surname"]);
    formDataPost.append("password", registerData["password"]);
    formDataPost.append("confirmPassword", registerData["confirmPassword"]);

    await fetch(`${API_URL}register.php`, {
      method: "POST",
      credentials: "include",
      body: formDataPost,
      headers: {}
    })
      .then(response => response.json())
      .then(data => {
        console.log("data", data);
        if (data.signIn) {
          localStorage.setItem("userData", JSON.stringify(data));
        }
      });
  };

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
              name: "",
              surname: "",
              password: "",
              confirmPassword: ""
            }}
            validationSchema={yupSchema}
            onSubmit={registerData => {
              registerUser(registerData);
              registerData.name = "";
              registerData.surname = "";
              registerData.password = "";
              registerData.confirmPassword = "";
            }}
          >
            <Form className={form}>
              <MyTextInput label="name" name="name" type="text" />
              <MyTextInput label="surname" name="surname" type="text" />
              <MyTextInput label="Password" name="password" type="password" />
              <MyTextInput
                label="confirmPassword"
                name="confirmPassword"
                type="password"
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
              <Link to="/login">
                <Typography
                  style={{
                    marginTop: "1rem"
                  }}
                  align="center"
                  variant="body1"
                >
                  You have account ? Log In !
                </Typography>
              </Link>
              {!loginResponse?.loggedIn && (
                <Typography
                  className={error}
                  style={{ marginTop: "1rem" }}
                  align="center"
                  variant="h5"
                >
                  {loginResponse?.message}
                </Typography>
              )}
            </Form>
          </Formik>
        </div>
      </Grid>
    </Grid>
  );
};

export default RegisterTemplate;
