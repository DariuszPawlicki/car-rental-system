import { useContext } from "react";
import { RentalCarContext } from "../../context/context";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button } from "@material-ui/core";

import DriveEtaIcon from "@material-ui/icons/DriveEta";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

import useStyles from "./style";

import { Fade } from "react-reveal";

import { API_URL } from "../../template/loginTemplate/loginTemplate";

const Header = () => {
  const {
    toolbar,
    icon,
    header,
    title,
    button,
    userDetails,
    iconUser
  } = useStyles();

  const { loginResponse, setLoginResponse } = useContext(RentalCarContext);

  return (
    <AppBar position="static" className={header}>
      <Toolbar className={toolbar}>
        <Fade left>
          <DriveEtaIcon className={icon} />
        </Fade>

        <Typography className={title} variant="h3">
          Cars Renting
        </Typography>

        {loginResponse.loggedIn && (
          <Fade right>
            <div className={userDetails}>
              <AccountCircleIcon className={iconUser} />
              <Typography variant="subtitle1" align="center">
                {loginResponse.username}
              </Typography>
            </div>
          </Fade>
        )}

        {loginResponse.loggedIn ? (
          <Fade right>
            <Button
              onClick={() => {
                setLoginResponse({
                  loggedIn: false
                });

                fetch(`${API_URL}logout.php`, {
                  credentials: "include"
                });
              }}
              className={button}
              component={Link}
              to="/"
              variant="outlined"
              color="inherit"
            >
              Logout
            </Button>
          </Fade>
        ) : (
          <Button
            className={button}
            component={Link}
            to="/login"
            variant="outlined"
            color="inherit"
          >
            Sign In
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
