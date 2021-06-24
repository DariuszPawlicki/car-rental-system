import { useState, useEffect, useReducer, createContext } from "react";
import axios from "axios";

import { API_URL } from "../template/loginTemplate/loginTemplate";

import {
  ADD_RESERVATION,
  DELETE_RESERVATION,
  ADD_ALL_RESERVATION
} from "./actionsType";

import { contextReducer } from "./contextReducer";

const initState = { rentalState: [] };

export const RentalCarContext = createContext(initState);

export const Provider = ({ children }) => {
  const [loginResponse, setLoginResponse] = useState({ loggedIn: false });

  const [carModels, setCardModels] = useState([]);

  const [state, dispatch] = useReducer(contextReducer, initState);

  const getReservationsData = async () => {
    try {
      await fetch(`${API_URL}fetch_rentals_data.php`, {
        method: "GET",
        credentials: "include"
      })
        .then(response => response.json())
        .then(data => {
          addAllReservation(data);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const getCarsData = async () => {
    fetch(`${API_URL}fetch_cars_data.php`, {
      method: "GET",
      credentials: "include"
    })
      .then(response => response.json())
      .then(data => setCardModels(data));
  };

  const getUserData = () => {
    const userData = localStorage.getItem("userData");
    const newUserData = JSON.parse(userData);

    if (newUserData === null) {
      setLoginResponse({ loggedIn: false });
    } else {
      setLoginResponse(newUserData);
    }
  };

  const deleteUser = () => {
    localStorage.removeItem("userData");
    setLoginResponse({
      loggedIn: false
    });
  };

  const addAllReservation = data => {
    dispatch({
      type: ADD_ALL_RESERVATION,
      payload: data
    });
  };

  const addCarReservation = data => {
    dispatch({
      type: ADD_RESERVATION,
      payload: data
    });
    getReservationsData();
  };

  const deleteReservation = rentalId => {
    fetch(`${API_URL}delete_rental.php`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ rentalId: rentalId })
    })
      .then(response => response.json())
      .then(({ deleted }) => {
        if (deleted) {
          dispatch({
            type: DELETE_RESERVATION,
            payload: rentalId
          });
          getReservationsData();
        }
      });
  };

  useEffect(() => {
    getUserData();
    if (loginResponse.loggedIn) {
      getCarsData();
      getReservationsData();
    }
  }, [loginResponse.loggedIn]);

  return (
    <RentalCarContext.Provider
      value={{
        carModels,
        addCarReservation,
        deleteReservation,
        state,
        loginResponse,
        setLoginResponse,
        deleteUser,
        dispatch,
        getReservationsData
      }}
    >
      {children}
    </RentalCarContext.Provider>
  );
};
