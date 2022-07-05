import React from "react";
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
  width: 75vw;
  height: 75vh;
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

const EditTickets = ({ user }) => {
  const ticketGroup = user.tickets.map((ticket) => {
    return (
      <div>
        {ticket.id}: {ticket.title}
      </div>
    );
  });

  return (
    <>
      <div className="bg"></div>
      <div className="bg bg2"></div>
      <div className="bg bg3"></div>
      <Container>{ticketGroup}</Container>
    </>
  );
};

export default EditTickets;
