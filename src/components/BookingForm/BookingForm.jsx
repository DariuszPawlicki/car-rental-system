import React, { useState, useEffect, useContext } from "react";

import { RentalCarContext } from "../../context/context";

import * as Yup from "yup";

import { MenuItem, TextField, FormControl, Button } from "@material-ui/core";
import useStyle from "./style";

import { formatDate } from "./dateTransform";
import { API_URL } from "../../template/loginTemplate/loginTemplate";

const yupSchema = Yup.object({
  name: Yup.string().required("Required !")
});

const dataInit = {
  name: "",
  surname: "",
  carModel: "",
  dateRental: formatDate(new Date()),
  dateEndRental: formatDate(new Date())
};

const Form = ({ itemID, setItemID }) => {
  const [selectedData, setSelectedData] = useState(dataInit);

  const [carRentResponse, setCarRentResponse] = useState({});

  const { form, input, formControl } = useStyle();

  const { carModels, addCarReservation, updateReservation, state } = useContext(
    RentalCarContext
  );

  useEffect(() => {
    const { rentalState } = state;
    const findCurrentItem = id => rentalState.filter(item => item.id === id);
    if (itemID) {
      const [updateItem] = findCurrentItem(itemID);
      setSelectedData(updateItem);
    }
  }, [itemID, state]);

  // useEffect(() => {
  //   console.log(carRentResponse);
  // }, [carRentResponse]);

  const handleChange = e => {
    setSelectedData({
      ...selectedData,
      [e.target.name]: e.target.value
    });
  };

  const addReservation = () => {
    if (itemID) {
      updateReservation(selectedData);
      setItemID(null);
    } else {
      const newSelectedData = {
        id: getCarID(),
        ...selectedData
      };
      addCarReservation(newSelectedData);
    }
    setSelectedData(dataInit);
  };

  const getCarID = () => {
    const [carID] = carModels.filter(
      car => `${car["car_make"]} ${car["car_model"]}` === selectedData.carModel
    );
    return carID["car_id"];
  };

  function bookCar() {
    let rentalDataForm = new FormData();

    const carID = getCarID();

    rentalDataForm.append("car_id", carID);
    rentalDataForm.append("name", selectedData["name"]);
    rentalDataForm.append("surname", selectedData["surname"]);
    rentalDataForm.append("date_rental", selectedData["dateRental"]);
    rentalDataForm.append("date_end_rental", selectedData["dateEndRental"]);

    fetch(API_URL + "book_car.php", {
      method: "POST",
      credentials: "include",
      body: rentalDataForm
    })
      .then(response => response.json())
      .then(data =>
        setCarRentResponse({
          message: data["message"],
          rentalSuccess: data["rental_success"]
        })
      );
  }

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
            if (selectedData === dataInit) return;
            addReservation();
            bookCar();
          }}
        >
          Book It
        </Button>
      </FormControl>
    </form>
  );
};

export default Form;
