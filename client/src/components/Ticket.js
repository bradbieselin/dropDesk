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
  inline-size: 250px;
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

const Errors = styled.div`
  font-size: 1rem;
`;

const Ticket = ({ ticket, id, index, refreshCategories }) => {
  const [isDeleted, setIsDeleted] = useState(false);
  const [errors, setErrors] = useState([]);
  const [edit, setEdit] = useState(false);
  const [title, setTitle] = useState(ticket.title);
  const [initialTitle, setInitialTitle] = useState(ticket.title);
  const [description, setDescription] = useState(ticket.description);
  const [descriptionInit, setDescriptionInit] = useState(ticket.description);

  const handleDelete = (e) => {
    e.preventDefault();
    fetch(`/tickets/${ticket.id}`, {
      method: "DELETE",
    }).then(refreshCategories());
    setIsDeleted(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`/tickets/${ticket.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: title, description: description }),
    }).then((r) => {
      if (r.ok) {
        r.json().then(refreshCategories);
        setEdit(false);
      } else {
        r.json().then((error) => setErrors(error.errors));
      }
    });
  };

  const handleReset = (e) => {
    setTitle(initialTitle);
    setDescription(descriptionInit);
  };

  const handleCancel = (e) => {
    setTitle(initialTitle);
    setDescription(descriptionInit);
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
            <form onSubmit={handleSubmit} onReset={handleReset}>
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
              <input type="submit" value="Submit" />
              <input type="reset" value="Reset" />
              <button onClick={handleCancel}>Cancel</button>
              <Errors>
                {errors.length ? errors.map((err) => <p>{err}.</p>) : null}
              </Errors>
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
              <Title>{ticket.title}</Title>
              <Gradient></Gradient>
              <ContentContainer>
                <Description>{ticket.description}</Description>
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
