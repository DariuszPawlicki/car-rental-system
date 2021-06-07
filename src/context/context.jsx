import { useState, useReducer, createContext } from "react";
import {
  ADD_RESERVATION,
  DELETE_RESERVATION,
  UPDATE_RESERVATION
} from "./actionsType";

import { contextReducer } from "./contextReducer";

const initState = { rentalState: [] };

export const RentalCarContext = createContext(initState);

export const Provider = ({ children }) => {
  const [loginResponse, setLoginResponse] = useState({});

  const [state, dispatch] = useReducer(contextReducer, initState);

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

  return (
    <RentalCarContext.Provider
      value={{
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
