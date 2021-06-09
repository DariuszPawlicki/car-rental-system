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
  const [loginResponse, setLoginResponse] = useState({ loggedIn: true });

  const [carModels, setCardModels] = useState([]);

  const [state, dispatch] = useReducer(contextReducer, initState);

  const getCarsData = async () => {
    try {
      const { data } = await axios.get(`${API_URL}fetch_cars_data.php`);
      setCardModels(data);
    } catch (error) {
      console.log(error);
    }
  };

  const updateReservation = data => {
    dispatch({
      type: UPDATE_RESERVATION,
      payload: data
    });
  };

  const addCarReservation = data => {
    dispatch({
      type: ADD_RESERVATION,
      payload: data
    });
  };

  const deleteReservation = id => {
    dispatch({
      type: DELETE_RESERVATION,
      payload: id
    });
  };

  useEffect(() => {
    getCarsData();
  }, []);

  return (
    <RentalCarContext.Provider
      value={{
        carModels,
        addCarReservation,
        deleteReservation,
        updateReservation,
        state,
        loginResponse,
        setLoginResponse
      }}
    >
      {children}
    </RentalCarContext.Provider>
  );
};
