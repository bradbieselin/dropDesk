import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Category from "./Category";

const Categories = ({ user }) => {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    fetch("/categories")
      .then((r) => r.json())
      .then(setCategories);
  }, []);

  const category = categories.map((category) => {
    return (
      <Category
        category={category}
        key={category.id}
        user={user}
        setCategories={setCategories}
        id={category.id}
      />
    );
  });

  return <>{category}</>;
};

export default Categories;
