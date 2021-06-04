import { makeStyles } from "@material-ui/core/styles";

export default makeStyles(theme => ({
  container: {
    position: "relative",
    marginTop: "5px",
    justifyContent: "space-between"
  },
  itemInfo: {
    flexGrow: 1
  },
  itemForm: {
    borderLeft: `3px solid ${theme.palette.primary.main}`,
    width: "45%",
    height: "600px",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      marginTop: "2rem",
      borderTop: `3px solid ${theme.palette.primary.main}`,
      borderLeft: "none"
    }
  }
}));
