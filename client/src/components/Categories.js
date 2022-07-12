import React, { useState, useEffect } from "react";
import Category from "./Category";
import { DragDropContext } from "react-beautiful-dnd";

export const transformData = (arrayOfCategories) => {
  let categoryKey = {};
  arrayOfCategories.forEach((category) => {
    categoryKey[category.id] = {
      title: category.title,
      tickets: category.tickets,
      id: category.id,
    };
  });
  return categoryKey;
};

const Categories = ({ user }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    refreshCategories();
  }, []);

  function refreshCategories() {
    fetch("/categories")
      .then((r) => r.json())
      .then(transformData)
      .then(setCategories);
  }

  const onDragEnd = (result, categories, setCategories) => {
    if (!result.destination) return;
    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId) {
      const sourceCategory = categories[source.droppableId];
      const destCategory = categories[destination.droppableId];
      const sourceTickets = [...sourceCategory.tickets];
      const destTickets = [...destCategory.tickets];
      const [removed] = sourceTickets.splice(source.index, 1);
      destTickets.splice(destination.index, 0, removed);

      fetch(`/tickets/${removed.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ category_id: destCategory.id }),
      }).then(
        setCategories({
          ...categories,
          [source.droppableId]: {
            ...sourceCategory,
            tickets: sourceTickets,
          },
          [destination.droppableId]: {
            ...destCategory,
            tickets: destTickets,
          },
        })
      );
    } else {
      const category = categories[source.droppableId];
      const copiedTickets = [...category.tickets];
      const [removed] = copiedTickets.splice(source.index, 1);
      copiedTickets.splice(destination.index, 0, removed);
      setCategories({
        ...categories,
        [source.droppableId]: {
          ...category,
          tickets: copiedTickets,
        },
      });
    }
  };

  const categoryGroup = Object.keys(categories).map((category_id) => {
    return (
      <Category
        category={categories[category_id]}
        key={category_id}
        user={user}
        setCategories={setCategories}
        id={category_id}
        categories={categories}
        refreshCategories={refreshCategories}
      />
    );
  });

  return (
    <DragDropContext
      onDragEnd={(result) => onDragEnd(result, categories, setCategories)}
    >
      {categoryGroup}
    </DragDropContext>
  );
};

export default Categories;
