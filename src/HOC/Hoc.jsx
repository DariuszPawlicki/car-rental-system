import { RentalCarContext } from "../context/context";

const withContext = Component => {
  return function contextComponent(props) {
    return (
      <RentalCarContext.Consumer>
        {context => <Component {...props} rentalContext={context} />}
      </RentalCarContext.Consumer>
    );
  };
};

export default withContext;
