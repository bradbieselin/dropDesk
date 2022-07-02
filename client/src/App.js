import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import TicketPage from "./components/TicketPage";
import NavBar from "./components/NavBar";
import styled from "styled-components";
import "./App.css";

const Content = styled.div``;

const Header = styled.header`
  width: 100%;
  position: sticky;
  top: 0;
`;

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // auto-login
    fetch("/me").then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
      }
    });
  }, []);

  if (!user) return <LandingPage onLogin={setUser} />;

  return (
    <>
      <Header>
        <NavBar user={user} setUser={setUser} />
      </Header>
      <Content>
        <BrowserRouter>
          <Switch>
            <Route path="/">
              <TicketPage user={user} />
            </Route>
          </Switch>
        </BrowserRouter>
      </Content>
    </>
  );
}

export default App;
