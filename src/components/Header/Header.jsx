import { useContext } from "react";
import { RentalCarContext } from "../../context/context";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button } from "@material-ui/core";

import DriveEtaIcon from "@material-ui/icons/DriveEta";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

import useStyles from "./style";

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
        <DriveEtaIcon className={icon} />
        <Typography className={title} variant="h3">
          Cars Renting
        </Typography>

        {loginResponse.loggedIn && (
          <div className={userDetails}>
            <AccountCircleIcon className={iconUser} />
            <Typography variant="subtitle1" align="center">
              {loginResponse.message}
            </Typography>
          </div>
        )}

        {loginResponse.loggedIn ? (
          <Button
            onClick={() =>
              setLoginResponse({
                loggedIn: false
              })
            }
            className={button}
            component={Link}
            to="/"
            variant="outlined"
            color="inherit"
          >
            Logout
          </Button>
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
