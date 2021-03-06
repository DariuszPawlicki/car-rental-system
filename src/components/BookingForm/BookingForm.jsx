import React, { useState, useContext } from "react";

import { RentalCarContext } from "../../context/context";

import {
  MenuItem,
  TextField,
  FormControl,
  Button,
  Typography
} from "@material-ui/core";
import useStyle from "./style";

import { formatDate } from "./dateTransform";
import { API_URL } from "../../template/loginTemplate/loginTemplate";

const dataInit = {
  name: "",
  surname: "",
  carModel: "",
  dateRental: formatDate(new Date()),
  dateEndRental: formatDate(new Date())
};

const Form = () => {
  const [selectedData, setSelectedData] = useState(dataInit);

  const [carSuccess, setCarSuccess] = useState(null);
  const [rentalMessage, setRentalMessage] = useState("");

  const {
    form,
    input,
    formControl,
    carErrorStyle,
    carSuccessStyle
  } = useStyle();

  const { carModels, addCarReservation } = useContext(RentalCarContext);

  const handleChange = e => {
    setSelectedData({
      ...selectedData,
      [e.target.name]: e.target.value
    });
  };

  const addReservation = () => {
    const newSelectedData = {
      id: getCarID(),
      ...selectedData
    };
    addCarReservation(newSelectedData);
    setSelectedData(dataInit);
  };

  const getCarID = () => {
    const [carID] = carModels.filter(
      car => `${car["car_make"]} ${car["car_model"]}` === selectedData?.carModel
    );
    return carID["car_id"];
  };

  const bookCar = async () => {
    let rentalDataForm = new FormData();

    rentalDataForm.append("car_id", getCarID());
    rentalDataForm.append("name", selectedData["name"]);
    rentalDataForm.append("surname", selectedData["surname"]);
    rentalDataForm.append("date_rental", selectedData["dateRental"]);
    rentalDataForm.append("date_end_rental", selectedData["dateEndRental"]);

    try {
      await fetch(API_URL + "book_car.php", {
        method: "POST",
        credentials: "include",
        body: rentalDataForm
      })
        .then(response => response.json())
        .then(({ message, rental_success: success }) => {
          if (success) {
            addReservation();
            setCarSuccess(success);
            setRentalMessage(message);
          } else {
            setCarSuccess(success);
            setRentalMessage(message);
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form className={form} noValidate autoComplete="off">
      <FormControl className={formControl}>
        <TextField
          variant="outlined"
          color="primary"
          className={input}
          id="name"
          name="name"
          label="Name"
          value={selectedData?.name}
          onChange={handleChange}
        />
        <TextField
          variant="outlined"
          color="primary"
          className={input}
          id="surname"
          name="surname"
          label="Surname"
          value={selectedData?.surname}
          onChange={handleChange}
        />
        <TextField
          variant="outlined"
          color="primary"
          className={input}
          id="carModel"
          name="carModel"
          select
          label="Select model"
          value={selectedData?.carModel}
          onChange={handleChange}
        >
          {carModels.length
            ? carModels.map(car => {
                return (
                  <MenuItem
                    key={car["car_id"]}
                    value={`${car["car_make"]} ${car["car_model"]}`}
                  >
                    {car["car_make"]} {car["car_model"]}
                  </MenuItem>
                );
              })
            : null}
        </TextField>
        <TextField
          className={input}
          id="date-rental"
          name="dateRental"
          type="date"
          label="Car rental date"
          defaultValue={selectedData?.dateRental}
          onChange={handleChange}
        />
        <TextField
          className={input}
          id="date-end-rental"
          name="dateEndRental"
          type="date"
          label="Car rental end date"
          value={selectedData?.dateEndRental}
          onChange={handleChange}
        />
        <Button
          className={input}
          size="large"
          color="primary"
          variant="contained"
          type="submit"
          onClick={e => {
            e.preventDefault();
            if (
              selectedData === dataInit ||
              selectedData.carModel === "" ||
              selectedData.surname === "" ||
              selectedData.name === ""
            ) {
              setRentalMessage(
                "Please fill in the details in the form correctly"
              );
              setSelectedData(dataInit);
              return;
            }

            bookCar();
            setSelectedData(dataInit);
          }}
        >
          Book It
        </Button>
        {selectedData ? (
          <Typography
            className={carSuccess ? carSuccessStyle : carErrorStyle}
            variant="h6"
          >
            {rentalMessage}
          </Typography>
        ) : null}
      </FormControl>
    </form>
  );
};

export default Form;
