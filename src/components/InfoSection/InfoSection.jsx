import React, { useContext } from "react";
import { RentalCarContext } from "../../context/context";
import { Grid, Typography } from "@material-ui/core";
import InfoCard from "./InfoCard/InfoCard";

import { useTheme } from "@material-ui/core/styles";

const InfoSection = ({ setItemID }) => {
  const { state } = useContext(RentalCarContext);
  console.log(state);

  const { error, rentalState } = state;
  const theme = useTheme();

  return (
    <Grid container justify="center" alignItems="center" direction="column">
      {error ? (
        <Typography variant="h4" style={{ color: theme.palette.error.main }}>
          The Car is Reserved!
        </Typography>
      ) : null}
      {rentalState.length ? (
        rentalState.map((card, index) => (
          <InfoCard key={index} setItemID={setItemID} {...card} />
        ))
      ) : (
        <Typography
          style={{ marginTop: "2rem" }}
          align="center"
          color="primary"
          variant="h4"
        >
          There are no reservations
        </Typography>
      )}
    </Grid>
  );
};

export default InfoSection;
