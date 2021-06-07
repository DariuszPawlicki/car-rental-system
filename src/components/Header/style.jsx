import { makeStyles } from "@material-ui/core/styles";

export default makeStyles(theme => ({
  header: {
    height: "100px",
    width: "100%",
    justifyContent: "center"
  },
  toolbar: {
    justifyContent: "space-between"
  },
  icon: {
    fontSize: "70px",
    marginLeft: "2rem"
  },
  title: {
    letterSpacing: "3px",
    [theme.breakpoints.down("xs")]: {
      fontSize: "30px"
    }
  },
  button: {
    marginRight: "2em"
  },
  iconUser: {
    fontSize: "50px"
  },
  userDetails: {
    [theme.breakpoints.down("sm")]: {
      display: "none"
    },
    display: "flex",
    height: "100%",
    minWidth: "100px",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "column"
  }
}));
