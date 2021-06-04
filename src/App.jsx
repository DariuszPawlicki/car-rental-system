import PageTemplate from "./template/pageTemplate";
import LoginTemplate from "./template/loginTemplate/loginTemplate";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Provider } from "./context/context";

const App = () => {
  return (
    <Provider>
      <Router>
        <Switch>
          <Route exact path="/login" component={LoginTemplate} />
          <Route path="/" component={PageTemplate} />
        </Switch>
      </Router>
    </Provider>
  );
};

export default App;
