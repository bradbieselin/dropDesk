import React, { useState, useEffect } from "react";
import Ticket from "./Ticket";
import styled from "styled-components";

const TicketPage = ({ user }) => {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    fetch("/tickets")
      .then((r) => r.json())
      .then(setTickets);
  }, []);

  const Container = styled.div`
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-auto-rows: auto;
    width: 100%;
    height: 100%;
  `;

  const ticketCards = tickets.map((ticket) => {
    return <Ticket key={ticket.id} ticket={ticket} />;
  });
  return (
    <div>
      <Container>{ticketCards}</Container>
    </div>
  );
};

export default TicketPage;
