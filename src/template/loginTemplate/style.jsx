import { makeStyles } from "@material-ui/core/styles";

import travel from "../../assets/travel.jpg";

export default makeStyles(theme => ({
  root: {
    height: "100vh"
  },
  form: {
    display: "flex",
    height: "100%",
    width: "100%",
    flexDirection: "column"
  },
  error: {
    color: theme.palette.error.dark
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    alignItems: "center",
    backgroundColor: "#fffdd0"
  },

  image: {
    backgroundImage: `url(${travel})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat"
  },
  avatar: {
    height: "60px",
    width: "60px",
    margin: theme.spacing(3),
    backgroundColor: theme.palette.info.main
  }
}));
