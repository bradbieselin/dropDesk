import React, { useEffect, useState } from "react";
import styled from "styled-components";
import TicketDetails from "./TicketDetails";

const Container = styled.div`
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
  text-align: center;
  width: 100%;
`;

const TicketContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const TicketList = styled.div`
  display: flex;
  margin-left: 1rem;
  flex-direction: column;
  height: 38vh;
  overflow-y: auto;
  width: 50%;
`;

const Ticket = styled.div`
  margin-right: 2rem;
  font-size: 1.3rem;
  cursor: pointer;
`;

const DetailsContainer = styled.div`
  align-items: center;
  text-align: center;
  margin: 5px auto auto auto;
  width: 300px;
`;

const MyTickets = ({ user }) => {
  const [tickets, setTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);

  useEffect(() => {
    fetch(`/users/${user.id}`)
      .then((r) => r.json())
      .then((data) => {
        setTickets(data.tickets);
      });
  }, []);

  function refreshTickets() {
    fetch(`/users/${user.id}`)
      .then((r) => r.json())
      .then((data) => {
        setTickets(data.tickets);
      });
  }

  function limitChars(string) {
    if (string.length > 18) {
      return string.slice(0, 18) + "...";
    }
    return string;
  }

  function handleClick(ticket) {
    setSelectedTicket(ticket);
  }

  return (
    <>
      <div className="bg"></div>
      <div className="bg bg2"></div>
      <div className="bg bg3"></div>
      <Container>
        <H2>{user.username}'s tickets</H2>
        <Gradient></Gradient>
        <TicketContainer>
          <TicketList>
            {tickets.map((ticket, index) => {
              return (
                <Ticket key={ticket.id} onClick={() => handleClick(ticket)}>
                  {index + 1}: {limitChars(ticket.title)}
                </Ticket>
              );
            })}
          </TicketList>
          <DetailsContainer>
            {selectedTicket ? (
              tickets.map((ticket) => {
                if (ticket.id === selectedTicket.id) {
                  return (
                    <TicketDetails
                      ticket={selectedTicket}
                      refreshTickets={refreshTickets}
                      key={ticket.id}
                      setSelectedTicket={setSelectedTicket}
                    />
                  );
                }
                return null;
              })
            ) : (
              <div>Select a ticket</div>
            )}
          </DetailsContainer>
        </TicketContainer>
      </Container>
    </>
  );
};

export default MyTickets;
