import './App.css';
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import { Route, Switch } from "react-router-dom";

function App() {
  return (
    <div className="app">
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
