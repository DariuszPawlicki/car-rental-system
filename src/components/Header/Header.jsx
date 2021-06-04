import React from "react";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button } from "@material-ui/core";
import DriveEtaIcon from "@material-ui/icons/DriveEta";

import useStyles from "./style";

const Header = () => {
  const { toolbar, icon, header, title, button } = useStyles();

  return (
    <AppBar position="static" className={header}>
      <Toolbar className={toolbar}>
        <DriveEtaIcon className={icon} />
        <Typography className={title} variant="h3">
          Car Renting
        </Typography>
        <Button
          className={button}
          component={Link}
          to="/login"
          variant="outlined"
          color="inherit"
        >
          Sign In
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
