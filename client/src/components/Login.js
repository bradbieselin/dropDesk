import React, { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
    width: 10%;
`;

const Form = styled.form`
  text-align: center;
  width: 100%;
`;

const Input = styled.input`
  height: 50%;
  width: 100%;
  display: block;
  margin-bottom: 1rem;
  text-align: center;
`;

const LoginButton = styled.button`
  margin: 1rem;
`;

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
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
          <label htmlFor="password">Password:</label>
          <Input
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <LoginButton type="submit">
          {isLoading ? "Loading..." : "Login"}{" "}
        </LoginButton>
        <div>
          {errors.map((err) => (
            <error key={err}>{err}</error>
          ))}
        </div>
      </Form>
    </Container>
  );
};

export default Login;
