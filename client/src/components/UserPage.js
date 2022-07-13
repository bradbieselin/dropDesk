import React, { useState, useEffect } from "react";
import styled from "styled-components";

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
  width: 50vw;
  height: 50vh;
  position: fixed;
  text-align: center;
  top: 50%;
  transform: translate(-50%, -50%);
  font-size: 1.5rem;
`;

const Gradient = styled.div`
  background: black;
  height: 2px;
  margin: 1rem;
  width: 96%;
`;

const H2 = styled.h2`
  margin: 1rem;
  padding: 0;
`;

const Form = styled.form`
  text-align: center;
`;

const Input = styled.input`
  width: 100%;
  margin: 1rem;
  text-align: center;
  font-size: 1.5rem;
`;

const H3 = styled.h3`
  font-size: 2rem;
`;

const UserPage = ({ user, refreshUser }) => {
  const [emailClicked, setEmailClicked] = useState(false);
  const [email, setEmail] = useState("");
  const [updatedEmail, setUpdatedEmail] = useState(false);
  const [displayEmail, setDisplayEmail] = useState(user.email);
  const [errors, setErrors] = useState([]);

  function handleSubmitEmail(e) {
    e.preventDefault();
    fetch(`/users/${user.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email }),
    }).then((r) => {
      if (r.ok) {
        r.json().then((d) => {
          setEmail("");
          setUpdatedEmail(true);
          setEmailClicked(false);
          setDisplayEmail(d.email);
          refreshUser();
        });
      } else {
        r.json().then((err) => setErrors(err.errors));
      }
    });
  }

  return (
    <>
      <div className="bg"></div>
      <div className="bg bg2"></div>
      <div className="bg bg3"></div>
      <Container>
        <H2>Welcome, {user.username}!</H2>
        <Gradient></Gradient>
        {emailClicked ? (
          <>
            <Form onSubmit={handleSubmitEmail}>
              <label>Current Email:</label>
              <H3>{displayEmail}</H3>
              <label>Update Email:</label>
              <Input
                type="text"
                value={email}
                placeholder="New Email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <button type="submit">Submit</button>
            </Form>
            <div>
              {errors.map((err) => (
                <error key={err}>{err}</error>
              ))}
            </div>
          </>
        ) : (
          <>
            <h3>Email: {updatedEmail ? displayEmail : user.email}</h3>
            <button
              onClick={() => {
                setEmailClicked(true);
              }}
            >
              Update Email
            </button>
          </>
        )}
      </Container>
    </>
  );
};

export default UserPage;
