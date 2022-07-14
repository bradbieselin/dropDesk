import React, { useState } from "react";
import styled from "styled-components";

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
  word-break: break-all;
  margin: 0.5rem;
`;

const ContentContainer = styled.div`
  -webkit-box-flex: 1;
  flex-grow: 1;
  flex-basis: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
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

const ButtonContainer = styled.div`
  flex-direction: row;
`;

const EditButton = styled.button`
  width: 5rem;
`;

const categories = [
  "URGENT",
  "Meetings",
  "To Do",
  "In Progress",
  "Needs Review",
];

const Category = styled.div`
  margin: 0.5rem;
`;

const Errors = styled.div`
  font-size: 1rem;
`;

const TicketDetails = ({ ticket, refreshTickets, setSelectedTicket }) => {
  const [edit, setEdit] = useState(false);
  const [title, setTitle] = useState(ticket.title);
  const [initialTitle, setInitialTitle] = useState(ticket.title);
  const [description, setDescription] = useState(ticket.description);
  const [descriptionInit, setDescriptionInit] = useState(ticket.description);
  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`/tickets/${ticket.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: title, description: description }),
    }).then((r) => {
      if (r.ok) {
        r.json().then((d) => {
          setTitle(d.title);
          setInitialTitle(d.description);
          setDescriptionInit(d.description);
          setSelectedTicket(null);
          refreshTickets();
        });
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
    setEdit(false);
    setTitle(initialTitle);
    setDescription(descriptionInit);
    setErrors([]);
  };

  return (
    <>
      <Category>{categories[ticket.category_id - 1]}</Category>
      <Gradient></Gradient>
      {edit ? (
        <Container
          style={{
            backgroundColor: "#B1D4E0",
          }}
        >
          <form onSubmit={handleSubmit} onReset={handleReset}>
            <Input
              type="text"
              autoComplete="off"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <Gradient></Gradient>
            <TextArea
              type="text"
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
        <Container
          style={{
            backgroundColor: "#B1D4E0",
          }}
        >
          <Title>{ticket.title}</Title>
          <Gradient></Gradient>
          <ContentContainer>
            <Description>{ticket.description}</Description>
          </ContentContainer>
          <ButtonContainer>
            <EditButton onClick={() => setEdit(true)}>Edit</EditButton>
          </ButtonContainer>
        </Container>
      )}
    </>
  );
};

export default TicketDetails;
