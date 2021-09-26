import React, { useState, useCallback } from "react";

export const ItemsListContext = React.createContext({
  itemsList: [],
  onAdd: () => {},
  onDelete: () => {},
  onInit: () => {},
});

const ItemsList = (props) => {
  const [itemsList, setItemsList] = useState([]);

  const handleInit = useCallback((items) => setItemsList(items), []);

  const handleAdd = (item) => {
    const updatedItemsList = [...itemsList];
    setItemsList([item, ...updatedItemsList]);
  };

  const handleDelete = (item) => {
    const updatedItemsList = itemsList.filter((i) => i.id !== item.id);
    setItemsList(updatedItemsList);
  };

  const itemsValue = {
    itemsList,
    onAdd: handleAdd,
    onDelete: handleDelete,
    onInit: handleInit,
  };
  return (
    <ItemsListContext.Provider value={itemsValue}>
      {props.children}
    </ItemsListContext.Provider>
  );
};

export default ItemsList;
