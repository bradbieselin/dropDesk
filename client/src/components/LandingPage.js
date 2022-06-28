import React, { useState } from "react";
import Login from "./Login";
import SignUp from "./SignUp";
import styled from "styled-components";

const BackGround = styled.div`
  height: 100vh;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 50rem;
`;

const LandingPage = ({ onLogin }) => {
  const [login, setLogin] = useState(true);
  const [signup, setSignup] = useState(false);
  return (
    <BackGround>
      <Container>
        {login ? <Login onLogin={onLogin} /> : <SignUp onLogin={onLogin} />}
        {login ? (
          <>
            <div>New user?</div>
            <button
              onClick={(e) => {
                setLogin(false);
                setSignup(true);
              }}
            >
              Sign Up
            </button>
          </>
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
    </BackGround>
  );
};

export default LandingPage;
