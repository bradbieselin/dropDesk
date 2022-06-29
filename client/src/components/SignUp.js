import React, { useState } from "react";
import styled from "styled-components";

const Container = styled.div``;

const Form = styled.form`
  text-align: center;
`;

const Input = styled.input`
  height: 50%;
  width: 100%;
  margin: 1rem;
  text-align: center;
`;

const Switch = styled.div`
  margin: 1rem;
  margin-top: 2rem;
`;

const Error = styled.div`
  font-size: 1rem;
`;

const SignUp = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setErrors([]);
    setIsLoading(true);
    fetch("/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        email,
        password,
      }),
    }).then((r) => {
      setIsLoading(false);
      if (r.ok) {
        r.json().then((user) => onLogin(user));
      } else {
        r.json().then((err) => setErrors(err.errors));
      }
    });
  }

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <Input
            type="text"
            id="username"
            autoComplete="off"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <Input
            type="text"
            id="email"
            autoComplete="off"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <Input
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">{isLoading ? "Loading..." : "Sign Up"} </button>
        <div>
          {errors.map((err) => (
            <Error key={err}>{err}. </Error>
          ))}
        </div>
      </Form>
      <Switch>Already have an account?</Switch>
    </Container>
  );
};

export default SignUp;
