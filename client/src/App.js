import { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

function App() {

  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route path="/users">
            <h1>Testing</h1>
          </Route>
          <Route path="/">
            <h1>Page Count:</h1>
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;