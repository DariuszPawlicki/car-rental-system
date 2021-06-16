import React from "react";
import { Grid } from "@material-ui/core";

import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";

import BookingForm from "../BookingForm/BookingForm";
import InfoSection from "../InfoSection/InfoSection";

import useStyles from "./style";

const HeroSection = () => {
  const { container, itemForm, itemInfo } = useStyles();

  const { breakpoints } = useTheme();
  const mediaSM = useMediaQuery(breakpoints.down("sm"));

  return (
    <Grid
      className={container}
      direction={mediaSM ? "column" : "row"}
      container
    >
      <Grid item className={itemInfo}>
        <InfoSection />
      </Grid>
      <Grid item className={itemForm}>
        <BookingForm />
      </Grid>
    </Grid>
  );
};

export default HeroSection;
