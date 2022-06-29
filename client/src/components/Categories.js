import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Category from "./Category";
import { Droppable } from "react-beautiful-dnd";

const Categories = ({ user }) => {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    fetch("/categories")
      .then((r) => r.json())
      .then(setCategories);
  }, []);

  const category = categories.map((category) => {
    return (
      <Droppable droppableId={category.id.toString()}>
        {(provided) => {
          return (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              <Category
                category={category}
                key={category.id}
                user={user}
                setCategories={setCategories}
                id={category.id}
              />
              {provided.placeholder}
            </div>
          );
        }}
      </Droppable>
    );
  });

  return <>{category}</>;
};

export default Categories;
