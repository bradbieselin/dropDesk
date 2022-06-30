import React, { useState, useEffect } from "react";
import Categories from "./Categories";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
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
