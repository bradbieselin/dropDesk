import React, { useState } from "react";
import Login from "./Login";
import SignUp from "./SignUp";
import Span from "./Span";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  left: 50%;
  top: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 0.25em;
  box-shadow: 0 0 0.25em rgba(0, 0, 0, 0.25);
  box-sizing: border-box;
  left: 50%;
  padding: 10vmin;
  position: fixed;
  text-align: center;
  top: 50%;
  transform: translate(-50%, -50%);
  font-size: 1.5rem;
`;

const Switch = styled.div`
  margin: 1rem;
`;

const LandingPage = ({ onLogin }) => {
  const [login, setLogin] = useState(true);
  const [signup, setSignup] = useState(false);

  const title = "dropDesk";

  return (
    <Wrapper>
      <div className="bg"></div>
      <div className="bg bg2"></div>
      <div className="bg bg3"></div>
      <Container>
        <div className="word" title="Click me!">
          {title.split("").map((letter, index) => {
            return <Span letter={letter} key={index} index={index}></Span>;
          })}
        </div>
        {login ? <Login onLogin={onLogin} /> : <SignUp onLogin={onLogin} />}
        {login ? (
          <Switch>
            <div>New user?</div>
            <button
              onClick={(e) => {
                setLogin(false);
                setSignup(true);
              }}
            >
              Sign Up
            </button>
          </Switch>
        ) : null}
        {signup ? (
          <>
            <button
              onClick={(e) => {
                setSignup(false);
                setLogin(true);
              }}
            >
              Login
            </button>
          </>
        ) : null}
      </Container>
    </Wrapper>
  );
};

export default LandingPage;
