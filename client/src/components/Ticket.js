import React, { useState } from "react";
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";

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

const Ticket = ({ ticket, setCategories, id, index }) => {
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
    <Draggable draggableId={id.toString()} index={index}>
      {(provided) =>
        isDeleted ? null : (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <Container>
              <Title>{ticket.title}</Title>
              <Gradient></Gradient>
              <Description>{ticket.description}</Description>
              <button onClick={handleDelete}>Delete</button>
            </Container>
          </div>
        )
      }
    </Draggable>
  );
};

export default Ticket;
