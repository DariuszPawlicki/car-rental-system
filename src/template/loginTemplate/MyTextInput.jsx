import React from "react";
import { useField } from "formik";
import { TextField, Typography } from "@material-ui/core";

import useStyles from "./style";

const MyTextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  const { error } = useStyles();

  return (
    <>
      <TextField
        style={{ marginTop: "2em" }}
        color="primary"
        label={label}
        variant="outlined"
        className="text-input"
        {...field}
        {...props}
      />
      {meta.touched && meta.error ? (
        <Typography variant="subtitle1" className={error}>
          {meta.error}
        </Typography>
      ) : null}
    </>
  );
};

export default MyTextInput;
