import React from "react";
import Categories from "./Categories";
import styled from "styled-components";

const Container = styled.div`
  display: inline-flex;
  justify-content: center;
  overflow-anchor: none;
  /* min-height: 83vh; */
  /* min-width: 100vw; */
  display: inline-flex;
  -webkit-touch-callout: none;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  touch-action: manipulation;
  max-height: auto;
`;

const TicketPage = ({ user }) => {
  return (
    <Container>
      <div className="bg"></div>
      <div className="bg bg2"></div>
      <div className="bg bg3"></div>
      <Categories user={user} />
    </Container>
  );
};

export default TicketPage;
