import React, { useState, useEffect } from "react";
import Categories from "./Categories";
import styled from "styled-components";
import { DragDropContext } from "react-beautiful-dnd";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const TicketPage = ({ user }) => {
  const onDragEnd = (result) => {
    const { destination, source, draggableId} = result;
    if(!destination) {
      return;
    }

    
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Container>
        <div className="bg"></div>
        <div className="bg bg2"></div>
        <div className="bg bg3"></div>
        <Categories user={user} />
      </Container>
    </DragDropContext>
  );
};

export default TicketPage;
