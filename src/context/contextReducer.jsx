import {
  ADD_RESERVATION,
  DELETE_RESERVATION,
  ADD_ALL_RESERVATION
} from "./actionsType";

export const contextReducer = (state, { type, payload }) => {
  switch (type) {
    case ADD_ALL_RESERVATION: {
      return { rentalState: payload };
    }
    case ADD_RESERVATION:
      return { rentalState: [...state.rentalState, payload] };

    case DELETE_RESERVATION:
      return {
        rentalState: state.rentalState.filter(item => item.id !== payload)
      };

    default:
      return state;
  }
};
