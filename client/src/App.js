import { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";

function App() {

  return (
    <BrowserRouter>
        <Switch>
          <Route path="/">
            <LandingPage />
          </Route>
          <Route path="/users">
          </Route>
        </Switch>
    </BrowserRouter>
  );
}

export default App;