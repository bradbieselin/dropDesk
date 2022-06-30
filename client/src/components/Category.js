import React, { useState } from "react";
import styled from "styled-components";
import Ticket from "./Ticket";
import { Droppable } from "react-beautiful-dnd";
import { transformData } from "./Categories";

const Container = styled.div`
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 0.25em;
  box-shadow: 0 0 0.25em rgba(0, 0, 0, 0.25);
  text-align: center;
  width: 20rem;
  font-size: 1.5rem;
  padding: 1rem;
  margin: 1rem;
`;

const Gradient = styled.div`
  background: black;
  height: 2px;
  margin: 1rem;
`;

const FormContainer = styled.div`
  margin: 1rem;
  border: 1px solid black;
  background-color: rgba(140, 240, 255);
`;

const Button = styled.button`
  margin-left: 1rem;
`;

const Category = ({ category, user, setCategories, id }) => {
  const [isClicked, setIsClicked] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTicket = {
      title: title,
      description: description,
      user_id: user.id,
      category_id: id,
    };
    fetch("/tickets", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTicket),
    }).then(
      fetch("/categories")
        .then((r) => r.json())
        .then(transformData)
        .then(setCategories)
    );
    setIsClicked(false);
  };

  return (
    <Droppable droppableId={id.toString()}>
      {(provided) => (
        <Container {...provided.droppableProps} ref={provided.innerRef}>
          {category.title}
          <Button onClick={() => setIsClicked(!isClicked)}>Add</Button>
          <Gradient></Gradient>
          {isClicked ? (
            <FormContainer>
              <form onSubmit={handleSubmit}>
                <label>Title</label>
                <input onChange={(e) => setTitle(e.target.value)}></input>
                <label>Description</label>
                <input onChange={(e) => setDescription(e.target.value)}></input>
                <button type="submit">Submit</button>
              </form>
            </FormContainer>
          ) : null}
          <div>
            {category.tickets.map((ticket, index) => {
              return (
                <Ticket
                  ticket={ticket}
                  key={ticket.id}
                  setCategories={setCategories}
                  id={ticket.id}
                  index={index}
                />
              );
            })}
          </div>
          {provided.placeholder}
        </Container>
      )}
    </Droppable>
  );
};

export default Category;
