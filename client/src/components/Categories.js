import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Category from "./Category";
import { DragDropContext } from "react-beautiful-dnd";

export const transformData = (arrayOfCategories) => {
  let categoryKey = {};
  arrayOfCategories.forEach((category) => {
    categoryKey[category.id] = {
      title: category.title,
      tickets: category.tickets,
    };
  });
  return categoryKey;
};

const Categories = ({ user }) => {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    fetch("/categories")
      .then((r) => r.json())
      .then(transformData)
      .then(setCategories);
  }, []);

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;
    if (!destination) return;
  };

  const categoryGroup = Object.keys(categories).map((category_id) => {
    return (
      <Category
        category={categories[category_id]}
        key={category_id}
        user={user}
        setCategories={setCategories}
        id={category_id}
      />
    );
  });

  return (
    <DragDropContext onDragEnd={onDragEnd}>{categoryGroup}</DragDropContext>
  );
};

export default Categories;
