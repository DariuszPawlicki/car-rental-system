import { makeStyles } from "@material-ui/core/styles";

export default makeStyles(theme => ({
  container: {
    marginTop: "3rem",
    position: "relative",
    width: "350px",
    height: "420px"
  },
  card: {
    width: "100%",
    height: "100%",
    borderRadius: "20px"
  },
  cardContent: {
    color: "#fff",
    backgroundColor: theme.palette.primary.main,
    alignItems: "center"
  },
  backgroundCard: {
    height: 200
  },
  icon: {
    top: "10%",
    left: "50%",
    transform: "translateX(-50%)",
    position: "absolute",
    fontSize: "60px",
    color: "#fff"
  },
  buttons: {
    justifyContent: "space-evenly"
  }
}));
