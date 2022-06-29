import React, { useState } from "react";

const Span = ({ letter }) => {
  const [clicked, setClicked] = useState(false);
  return (
    <span
      onClick={() => setClicked(true)}
      onAnimationEnd={() => setClicked(false)}
      className={clicked ? "active" : ""}
    >{letter}</span>
  );
};

export default Span;
