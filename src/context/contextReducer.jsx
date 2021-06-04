import {
  ADD_RESERVATION,
  DELETE_RESERVATION,
  UPDATE_RESERVATION
} from "./actionsType";

export const contextReducer = (state, { type, payload }) => {
  switch (type) {
    case ADD_RESERVATION:
      let alert = false;
      const currentState = state.rentalState.map(item => {
        if (
          item.carModel === payload.carModel &&
          (item.dateRental === payload.dateRental ||
            item.dateEndRental === payload.dateEndRental)
        ) {
          alert = true;
          return item;
        } else {
          return item;
        }
      });

      return alert
        ? { error: alert, rentalState: [...currentState] }
        : { rentalState: [...currentState, payload] };

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
