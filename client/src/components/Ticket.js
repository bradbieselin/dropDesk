import React, { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  margin: 1rem;
  border: 1px solid black;
  background-color: rgba(140, 240, 255);
`;

const Title = styled.div`
  font-size: 1.5rem;
`;

const Gradient = styled.div`
  background: black;
  height: 2px;
  margin: 0.5rem;
`;

const Description = styled.div`
  font-size: 1rem;
`;

const Ticket = ({ ticket, setCategories }) => {
  const [isDeleted, setIsDeleted] = useState(false);
  const handleDelete = (e) => {
    e.preventDefault();
    fetch(`/tickets/${ticket.id}`, {
      method: "DELETE",
    }).then(
      fetch("/categories")
        .then((r) => r.json())
        .then(setCategories)
    );
    setIsDeleted(true);
  };

  return (
    <>
      {isDeleted ? null : (
        <Container>
          <Title>{ticket.title}</Title>
          <Gradient></Gradient>
          <Description>{ticket.description}</Description>
          <button onClick={handleDelete}>Delete</button>
        </Container>
      )}
    </>
  );
};

export default Ticket;
