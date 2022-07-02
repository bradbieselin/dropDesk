import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const NavLogoDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  overflow: hidden;
  top: 0;
  margin-left: 2rem;
  margin-right: 2rem;
`;

const NavLogo = styled.p`
  list-style-type: none;
  font-size: 1.5rem;
  margin: 1rem;
`;

const NavUl = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: flex-end;
`;

const linkStyle = {
  margin: "1rem",
  textDecoration: "none",
  cursor: "pointer",
};

const NavItem = styled.p`
  margin: 2rem;
  cursor: "pointer";
  font-size: 1.5rem;
`;

const NavBar = ({ user, setUser }) => {
  function handleLogoutClick() {
    fetch("/logout", { method: "DELETE" }).then((r) => {
      if (r.ok) {
        setUser(null);
      }
    });
  }

  return (
    <NavLogoDiv>
      <NavLogo>dropDesk</NavLogo>
      <NavUl>
        <NavItem style={linkStyle} onClick={handleLogoutClick}>
          Logout
        </NavItem>
      </NavUl>
    </NavLogoDiv>
  );
};

export default NavBar;
