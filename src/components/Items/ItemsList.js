import Card from "../UI/Card";
import classes from "./ItemsList.module.css";
import { useContext, useEffect, useState } from "react";
import { ItemsListContext } from "../../store/itemsList-provider";
import Item from "./Item.js";

const firebase =
  "https://food-todo-f83d8-default-rtdb.asia-southeast1.firebasedatabase.app/";

const ItemsList = (props) => {
  const { itemsList, onInit, onDelete } = useContext(ItemsListContext);
  const [optionValue, setOptionValue] = useState("");

  useEffect(() => {
    const fetchHandler = async () => {
      const response = await fetch(`${firebase}orders.json`);
      const data = await response.json();
      const transformData = [];
      for (let key in data) {
        transformData.push({
          id: key,
          nameValue: data[key].nameValue,
          phoneValue: data[key].phoneValue,
          dayValue: data[key].dayValue,
          timeValue: data[key].timeValue,
          productId: data[key].productId,
          img: data[key].img,
        });
      }

      onInit(transformData);
    };

    fetchHandler();
  }, [onInit]);

  const handleSelect = (e) => {
    setOptionValue(e.target.value);
  };

  const handleDelete = async (item) => {
    onDelete(item);

    await fetch(`${firebase}orders/${item.id}.json`, {
      method: "DELETE",
      body: JSON.stringify(item),
      headers: { "Content-Type": "application/json" },
    });
  };

  let listItem;

  if (itemsList.length === 0 || props.items.length === 0) {
    return null;
  }

  const options = [{ name: "all", productId: "" }];
  for (let key in props.items) {
    options.push({
      name: props.items[key].name,
      productId: props.items[key].productId,
    });
  }

  let filtered =
    optionValue === ""
      ? itemsList
      : itemsList.filter((item) => item.productId === optionValue);

  if (itemsList && itemsList.length > 0) {
    listItem = filtered.map((item) => (
      <Item key={item.id} item={item} onDelete={handleDelete} />
    ));
  }

  return (
    <Card className={classes.ItemsList}>
      <div className={classes.header}>
        <h1>Order Items</h1>
        <div className={classes.searchBox}>
          <select onChange={handleSelect}>
            {options.map((opt) => (
              <option value={opt.productId} key={opt.productId}>
                {opt.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <ul className={classes.listGroup}>{listItem}</ul>
    </Card>
  );
};

export default ItemsList;
