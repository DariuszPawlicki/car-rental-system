import {
  ADD_RESERVATION,
  DELETE_RESERVATION,
  UPDATE_RESERVATION
} from "./actionsType";

export const contextReducer = (state, { type, payload }) => {
  switch (type) {
    case ADD_RESERVATION:
      return { rentalState: [...state.rentalState, payload] };

    case DELETE_RESERVATION:
      return {
        rentalState: state.rentalState.filter(item => item.id !== payload)
      };

    case UPDATE_RESERVATION:
      return {
        rentalState: state.rentalState.map(item => {
          if (item.id === payload.id) {
            return payload;
          } else {
            return item;
          }
        })
      };
    default:
      return state;
  }
};
