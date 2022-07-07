import React, { useState } from "react";
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";

const Container = styled.div`
  user-select: none;
  border-radius: 2px;
  border: 2px solid transparent;
  box-shadow: none;
  box-sizing: border-box;
  padding: 8px;
  margin-bottom: 8px;
`;

const Title = styled.div`
  font-size: 1.5rem;
  overflow-wrap: break-word;
  margin: 0.5rem;
`;

const Gradient = styled.div`
  background: black;
  height: 2px;
  margin: 0.5rem;
`;

const Description = styled.div`
  font-size: 1rem;
  overflow-wrap: break-word;
  margin: 0.5rem;
`;

const DeleteButton = styled.button`
  margin: 0.5rem;
  width: 5rem;
`;

const UserContainer = styled.div`
  display: flex;
  margin-top: 8px;
  -webkit-box-align: center;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
`;

const Small = styled.small`
  -webkit-box-flex: 0;
  flex-grow: 0;
  margin: 0px;
  border-radius: 2px;
  font-weight: normal;
  padding: 4px;
`;

const ContentContainer = styled.div`
  -webkit-box-flex: 1;
  flex-grow: 1;
  flex-basis: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ButtonContainer = styled.div`
  flex-direction: row;
`;

const EditButton = styled.button`
  width: 5rem;
`;

const Input = styled.input`
  height: 2rem;
  width: 100%;
  text-align: center;
`;

const TextArea = styled.textarea`
  height: 100px;
  width: 98%;
  padding: 1%;
  border: none;
  resize: none;
`;

const Ticket = ({ ticket, setCategories, id, index, onTicketUpdate }) => {
  const [isDeleted, setIsDeleted] = useState(false);
  const [edit, setEdit] = useState(false);
  const [title, setTitle] = useState(ticket.title);
  const [description, setDescription] = useState(ticket.description);
  const [display, setDisplay] = useState({ title: "", description: "" });
  const [updatedTicket, setUpdatedTicket] = useState(false);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`/tickets/${ticket.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: title, description: description }),
    })
      .then((r) => r.json())
      .then((data) => {
        setUpdatedTicket(true);
        setDisplay(data);
        onTicketUpdate(data);
      });
    setEdit(false);
  };

  return (
    <Draggable draggableId={id.toString()} index={index}>
      {(provided, snapshot) =>
        isDeleted ? null : edit ? (
          <Container
            style={{
              backgroundColor: snapshot.isDragging ? "aquamarine" : "#B1D4E0",
            }}
          >
            <form onSubmit={handleSubmit}>
              <Input
                type="text"
                id="title"
                autoComplete="off"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <Gradient></Gradient>
              <TextArea
                type="text"
                id="description"
                autoComplete="off"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <button>Save</button>
            </form>
          </Container>
        ) : (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <Container
              style={{
                backgroundColor: snapshot.isDragging ? "aquamarine" : "#B1D4E0",
              }}
            >
              <Title>{updatedTicket ? display.title : ticket.title}</Title>
              <Gradient></Gradient>
              <ContentContainer>
                <Description>
                  {updatedTicket ? display.description : ticket.description}
                </Description>
                <UserContainer>
                  <Small>User: {ticket.username}</Small>
                </UserContainer>
                <ButtonContainer>
                  <EditButton onClick={() => setEdit(true)}>Edit</EditButton>
                  <DeleteButton onClick={handleDelete}>Delete</DeleteButton>
                </ButtonContainer>
              </ContentContainer>
            </Container>
          </div>
        )
      }
    </Draggable>
  );
};

export default Ticket;
