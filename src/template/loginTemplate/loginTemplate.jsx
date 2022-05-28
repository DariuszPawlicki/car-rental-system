import React, { useContext } from "react";
import { Link } from "react-router-dom";

import { RentalCarContext } from "../../context/context";

import { Formik, Form } from "formik";
import * as Yup from "yup";

import MyTextInput from "./MyTextInput";

import { Grid, Paper, Avatar, Button, Typography } from "@material-ui/core";

import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import useStyles from "./style";

const yupSchema = Yup.object({
  login: Yup.string().required("Required!"),
  password: Yup.string()
    .min(8, "Minimum 8 characters")
    .required("Required !")
});

//export const API_URL = "https://cars-renting-server.herokuapp.com/";
//export const API_URL = "http://localhost:4000/server/";
export const API_URL = "https://ec2-35-159-52-215.eu-central-1.compute.amazonaws.com/";

const LoginTemplate = () => {
  const { root, image, paper, avatar, form, error } = useStyles();

  const { loginResponse, setLoginResponse } = useContext(RentalCarContext);

  const login = async loginData => {
    let formDataPost = new FormData();
    formDataPost.append("username", loginData["login"]);
    formDataPost.append("password", loginData["password"]);

    await fetch(`${API_URL}login.php`, {
      method: "POST",
      credentials: "include",
      body: formDataPost
    })
      .then(response => response.json())
      .then(data => {
        if (data.loggedIn) {
          localStorage.setItem("userData", JSON.stringify(data));
        }
        setLoginResponse({
          loggedIn: data["loggedIn"],
          message: data["message"],
          username: data["username"]
        });
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
              login: "",
              password: ""
            }}
            validationSchema={yupSchema}
            onSubmit={loginData => {
              login(loginData);
              loginData.login = "";
              loginData.password = "";
            }}
          >
            <Form className={form}>
              <MyTextInput label="Login" name="login" type="text" />
              <MyTextInput label="Password" name="password" type="password" />
              <Button
                style={{ marginTop: "2em" }}
                variant="contained"
                color="primary"
                size="large"
                type="submit"
              >
                Submit
              </Button>
              <Link to="/register">
                <Typography
                  style={{
                    marginTop: "1rem"
                  }}
                  align="center"
                  variant="body1"
                >
                  You don't have account yet ? Sign In !
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

export default LoginTemplate;
