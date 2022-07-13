import React from "react";
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

const TicketDetails = ({ ticket }) => {
  return (
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
    </Container>
  );
};

export default TicketDetails;
