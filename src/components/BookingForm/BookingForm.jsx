import React, { useState, useEffect, useContext } from "react";
import { v4 as uuid } from "uuid";
import { RentalCarContext } from "../../context/context";

import { MenuItem, TextField, FormControl, Button } from "@material-ui/core";
import useStyle from "./style";

import { formatDate } from "./dateTransform";

const carsModel = [
  { model: "Peugeot 208" },
  { model: "Volkswagen Passat" },
  { model: "BWM X6" },
  { model: "BMW I7" },
  { model: "Peugeot 207" }
];

const dataInit = {
  name: "",
  surname: "",
  carModel: "",
  dateRental: formatDate(new Date()),
  dateEndRental: formatDate(new Date())
};

const Form = ({ itemID, setItemID }) => {
  const [selectedData, setSelectedData] = useState(dataInit);
  const { form, input, formControl } = useStyle();

  const { addCarReservation, updateReservation, state } = useContext(
    RentalCarContext
  );

  const { rentalState } = state;

  const findCurrentItem = id => rentalState.filter(item => item.id === id);

  useEffect(() => {
    if (itemID) {
      const [updateItem] = findCurrentItem(itemID);
      setSelectedData(updateItem);
    }
  }, [itemID]);

  const handleChange = e => {
    setSelectedData({
      ...selectedData,
      [e.target.name]: e.target.value
    });
  };

  const addReservation = e => {
    e.preventDefault();
    if (selectedData === dataInit) return;
    if (itemID) {
      updateReservation(selectedData);
      setItemID(null);
    } else {
      const newSelectedData = {
        id: uuid(),
        ...selectedData
      };
      addCarReservation(newSelectedData);
    }
    setSelectedData(dataInit);
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
          value={selectedData.name}
          onChange={handleChange}
        />
        <TextField
          variant="outlined"
          color="primary"
          className={input}
          id="surname"
          name="surname"
          label="Surname"
          value={selectedData.surname}
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
          value={selectedData.carModel}
          onChange={handleChange}
        >
          {carsModel.map((car, index) => (
            <MenuItem key={index} value={car.model}>
              {car.model}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          className={input}
          id="date-rental"
          name="dateRental"
          type="date"
          label="Car rental date"
          defaultValue={selectedData.dateRental}
          onChange={handleChange}
        />
        <TextField
          className={input}
          id="date-end-rental"
          name="dateEndRental"
          type="date"
          label="Car rental end date"
          value={selectedData.dateEndRental}
          onChange={handleChange}
        />
        <Button
          className={input}
          size="large"
          color="primary"
          variant="contained"
          type="submit"
          onClick={e => addReservation(e)}
        >
          Book It
        </Button>
      </FormControl>
    </form>
  );
};

export default Form;
