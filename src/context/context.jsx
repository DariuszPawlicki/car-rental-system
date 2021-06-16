import { useState, useEffect, useReducer, createContext } from "react";
import axios from "axios";

import { API_URL } from "../template/loginTemplate/loginTemplate";

import {
  ADD_RESERVATION,
  DELETE_RESERVATION,
  UPDATE_RESERVATION
} from "./actionsType";

import { contextReducer } from "./contextReducer";

const initState = { rentalState: [] };

export const RentalCarContext = createContext(initState);

export const Provider = ({ children }) => {
  const [loginResponse, setLoginResponse] = useState({ loggedIn: false });

  const [carModels, setCardModels] = useState([]);
  const [reservationsData, setReservationsData] = useState({});

  const [carRentResponse, setCarRentResponse] = useState({});

  const [state, dispatch] = useReducer(contextReducer, initState);

  const getReservationsData = () => {
    fetch(`${API_URL}fetch_rentals_data.php`, {
      method: "GET",
      credentials: "include"
    })
    .then((response) => response.json())
    .then((data) => setReservationsData(data))
  };

  const getCarsData = async () => {
    try {
      const { data } = await axios.get(`${API_URL}fetch_cars_data.php`);
      setCardModels(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getUserData = () => {
    const userData = localStorage.getItem("userData");
    setLoginResponse(JSON.parse(userData));
  };

  const deleteUser = () => {
    localStorage.removeItem("userData");
    setLoginResponse({
      loggedIn: false
    });
  };

  const addCarReservation = data => {
    dispatch({
      type: ADD_RESERVATION,
      payload: data
    });
  };

  const deleteReservation = async id => {
      fetch(`${API_URL}delete_rental.php`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({"rentalId": carRentResponse.rentalId})
      });

    dispatch({
      type: DELETE_RESERVATION,
      payload: id
    });
  };

  useEffect(() => {
    if(loginResponse.loggedIn)
    {
      getCarsData();
      getUserData();
      getReservationsData();
    }  
  }, [loginResponse.loggedIn]);

  useEffect(() => {

    console.log(reservationsData);
  }, [reservationsData])

  return (
    <RentalCarContext.Provider
      value={{
        carModels,
        addCarReservation,
        deleteReservation,
        state,
        loginResponse,
        setLoginResponse,
        carRentResponse,
        setCarRentResponse,
        deleteUser
      }}
    >
      {children}
    </RentalCarContext.Provider>
  );
};