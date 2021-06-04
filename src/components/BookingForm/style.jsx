import { makeStyles } from "@material-ui/core/styles";

export default makeStyles(theme => ({
  form: {
    height: "100%",
    width: "100%"
  },
  formControl: {
    height: "100%",
    width: "100%",
    alignItems: " center"
  },
  input: {
    marginTop: "30px",
    width: "380px",
    [theme.breakpoints.down("xs")]: {
      width: "80%"
    }
  }
}));
