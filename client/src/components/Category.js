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
  padding: 4px;
  margin: 8px;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const Gradient = styled.div`
  background: black;
  height: 2px;
  margin: 1rem;
`;

const FormContainer = styled.div`
  user-select: none;
  border-radius: 2px;
  border: 2px solid transparent;
  box-shadow: none;
  box-sizing: border-box;
  padding: 8px 8px 0px;
  background: #b1d4e0;
  margin-left: 0.5rem;
  margin-right: 0.5rem;
  margin-top: 0.5rem;
`;

const Button = styled.button`
  margin-left: 1rem;
`;

const DropDiv = styled.div`
  display: flex;
  flex-direction: column;
  opacity: inherit;
  padding: 8px 8px 0px;
  border: 8px;
  transition: background-color 0.2s ease 0s, opacity 0.1s ease 0s;
  user-select: none;
  /* Adjust height with scroll */
  min-height: 83vh;
`;

const CategoryTitle = styled.div`
  height: 5vh;
`;

const TicketContainer = styled.div`
  height: 83vh;
  margin: 0.5rem;
  overflow-y: auto;
  overflow-x: ;
`;

const Label = styled.label`
  display: block;
  text-align: center;
  line-height: 150%;
  font-size: 0.85em;
`;

const Input = styled.input`
  height: 2rem;
  width: 85%;
  text-align: center;
`;

const TextArea = styled.textarea`
  height: 100px;
  width: 95%;
  padding: 1%;
  border: none;
  resize: none;
`;

const Category = ({
  category,
  user,
  setCategories,
  categories,
  id,
  refreshCategories,
}) => {
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
    })
      .then((r) => r.json())
      .then(refreshCategories);
    setIsClicked(false);
  };

  return (
    <Container>
      <CategoryTitle>
        {category.title}
        <Button onClick={() => setIsClicked(!isClicked)}>Add</Button>
        <Gradient></Gradient>
      </CategoryTitle>
      <TicketContainer>
        {isClicked ? (
          <FormContainer>
            <form onSubmit={handleSubmit}>
              <Label>Title</Label>
              <Input onChange={(e) => setTitle(e.target.value)}></Input>
              <Gradient></Gradient>
              <Label>Description</Label>
              <TextArea
                onChange={(e) => setDescription(e.target.value)}
              ></TextArea>
              <button type="submit">Submit</button>
            </form>
          </FormContainer>
        ) : null}
        <Droppable droppableId={id.toString()}>
          {(provided, snapshot) => (
            <DropDiv
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={{
                background: snapshot.isDraggingOver ? "#C2E5D3" : "",
              }}
            >
              {category.tickets.map((ticket, index) => {
                return (
                  <Ticket
                    ticket={ticket}
                    key={ticket.id}
                    setCategories={setCategories}
                    id={ticket.id}
                    index={index}
                    categories={categories}
                    refreshCategories={refreshCategories}
                  />
                );
              })}
              {provided.placeholder}
            </DropDiv>
          )}
        </Droppable>
      </TicketContainer>
    </Container>
  );
};

export default Category;
