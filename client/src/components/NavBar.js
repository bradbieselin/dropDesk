import React from "react";

const NavBar = ({ user, setUser }) => {
  function handleLogoutClick() {
    fetch("/logout", { method: "DELETE" }).then((r) => {
      if (r.ok) {
        setUser(null);
      }
    });
  }

  return (
    <div>
      <button onClick={handleLogoutClick}>Logout</button>
    </div>
  );
};

export default NavBar;
