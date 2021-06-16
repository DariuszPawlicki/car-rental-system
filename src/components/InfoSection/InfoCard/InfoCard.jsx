import React, { useContext } from "react";
import { RentalCarContext } from "../../../context/context";

import woodCard from "../../../assets/woodCard.jpg";
import useStyles from "./style";

import PersonAddIcon from "@material-ui/icons/PersonAdd";

import {
  Grid,
  Card,
  CardActionArea,
  CardActions,
  Button,
  CardMedia,
  CardContent,
  Typography
} from "@material-ui/core";

const InfoCard = ({
  borrowers_name: name,
  borrowers_lastname: surname,
  carModel,
  date_of_rent: dateRental,
  date_of_return: dateEndRental,
  car_id: id
}) => {
  const {
    container,
    card,
    backgroundCard,
    cardContent,
    icon,
    buttons
  } = useStyles();

  const { deleteReservation } = useContext(RentalCarContext);

  return (
    <Grid item className={container}>
      <Card elevation={6} className={card}>
        <CardActionArea>
          <PersonAddIcon className={icon} />
          <CardMedia className={backgroundCard} image={woodCard} />
          <CardContent className={cardContent}>
            <Typography
              align="center"
              gutterBottom
              variant="h6"
            >{`${name} ${surname}`}</Typography>
            <Typography align="center" gutterBottom variant="subtitle1">
              Car Model: {carModel}
            </Typography>
            <Typography align="center" gutterBottom variant="subtitle1">
              Date Rental: {dateRental}
            </Typography>
            <Typography align="center" gutterBottom variant="subtitle1">
              Date End Rental: {dateEndRental}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions className={buttons}>
          <Button
            onClick={() => {
              deleteReservation(id);
            }}
            variant="outlined"
            size="medium"
            color="secondary"
          >
            Delete
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default InfoCard;
