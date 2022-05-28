import { useContext } from "react";
import { RentalCarContext } from "./context/context";

import PageTemplate from "./template/pageTemplate";
import LoginTemplate from "./template/loginTemplate/loginTemplate";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import RegisterTemplate from "./template/registerTemplate/registerTemplate";

const App = () => {
  const { loginResponse } = useContext(RentalCarContext);

  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/register">
            {!loginResponse?.loggedIn && <RegisterTemplate />}
          </Route>
          <Route exact path="/login">
            {loginResponse?.loggedIn ? <PageTemplate /> : <LoginTemplate />}
          </Route>
          <Route path="/">
            {loginResponse?.loggedIn ? <PageTemplate /> : <LoginTemplate />}
          </Route>
        </Switch>
      </Router>
    </>
  );
};

export default App;
