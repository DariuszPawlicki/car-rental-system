import { makeStyles } from "@material-ui/core/styles";

export default makeStyles(theme => ({
  header: {
    height: "100px",
    justifyContent: "center"
  },
  toolbar: {
    justifyContent: "space-evenly"
  },
  icon: {
    fontSize: "70px"
  },
  title: {
    letterSpacing: "3px",
    [theme.breakpoints.down("xs")]: {
      fontSize: "30px"
    }
  },
  button: {
    marginLeft: "2em"
  }
}));
