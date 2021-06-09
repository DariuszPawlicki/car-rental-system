import { useField } from "formik";
import { TextField, Typography } from "@material-ui/core";

import Fade from "react-reveal/Fade";

import useStyles from "./style";

const MyTextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  const { error, inputContainer } = useStyles();

  return (
    <div className={inputContainer}>
      <TextField
        style={{ width: "100%" }}
        color="primary"
        label={label}
        variant="outlined"
        className="text-input"
        {...field}
        {...props}
      />
      {meta.touched && meta.error ? (
        <Fade top>
          <Typography variant="subtitle1" className={error}>
            {meta.error}
          </Typography>
        </Fade>
      ) : null}
    </div>
  );
};

export default MyTextInput;
