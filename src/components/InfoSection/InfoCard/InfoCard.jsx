import React, { useContext } from "react";
import { RentalCarContext } from "../../../context/context";

import woodCard from "../../../assets/woodCard.jpg";
import useStyles from "./style";

import PersonAddIcon from "@material-ui/icons/PersonAdd";

import { API_URL } from "../../../template/loginTemplate/loginTemplate";

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
  name,
  surname,
  carModel,
  dateRental,
  dateEndRental,
  setItemID,
  id
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

  function cancelRental()
  {
    fetch(API_URL + 'delete_rental.php', {
      method: "POST",
      credentials: "include"
    })
  }

  function updateRentalInfo()
  {

  }

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
              cancelRental()           
              deleteReservation(id)
            }}
            variant="outlined"
            size="medium"
            color="secondary"
          >
            Delete
          </Button>
          <Button
            onClick={() => {
                updateRentalInfo()
                setItemID(id)
            }}
            variant="outlined"
            size="medium"
            color="primary"
          >
            Update
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default InfoCard;
