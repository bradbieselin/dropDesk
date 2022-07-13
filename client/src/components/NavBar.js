import React from "react";
import { Link, useHistory } from "react-router-dom";
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
  color: "black",
};

const logoLinkStyle = {
  margin: "1rem",
  textDecoration: "none",
  cursor: "pointer",
  color: "black",
  fontSize: "1.5rem",
};

const NavItem = styled.p`
  margin: 2rem;
  cursor: "pointer";
  font-size: 1.5rem;
`;

const NavBar = ({ user, setUser }) => {
  const history = useHistory();

  function handleLogoutClick() {
    fetch("/logout", { method: "DELETE" }).then((r) => {
      if (r.ok) {
        setUser(null);
        history.push("/");
      }
    });
  }

  return (
    <NavLogoDiv>
      <Link to="/" style={logoLinkStyle}>
        dropDesk
      </Link>
      <NavUl>
        <Link to="/mytickets" style={logoLinkStyle}>
          My Tickets
        </Link>
        <Link to="/user" style={logoLinkStyle}>
          Account
        </Link>
        <NavItem style={linkStyle} onClick={handleLogoutClick}>
          Logout
        </NavItem>
      </NavUl>
    </NavLogoDiv>
  );
};

export default NavBar;
