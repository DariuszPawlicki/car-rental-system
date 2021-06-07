import { useContext } from "react";
import { RentalCarContext } from "./context/context";

import PageTemplate from "./template/pageTemplate";
import LoginTemplate from "./template/loginTemplate/loginTemplate";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const App = () => {
  const { loginResponse } = useContext(RentalCarContext);
  console.log(loginResponse);

  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/login">
            {loginResponse?.loggedIn ? <PageTemplate /> : <LoginTemplate />}
          </Route>
          <Route path="/" component={PageTemplate} />
        </Switch>
      </Router>
    </>
  );
};

export default App;
