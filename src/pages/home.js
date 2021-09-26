import { Route } from "react-router";
import AddItem from "../components/Items/AddItem";
import FormItem from "../components/Items/FormItem";
import ItemsList from "../components/Items/ItemsList";
import { useEffect, useState } from "react";
import Container from "../components/UI/LoadingCell";

const firebase =
  "https://food-todo-f83d8-default-rtdb.asia-southeast1.firebasedatabase.app/";

const Home = (props) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      const response = await fetch(`${firebase}items.json`);
      const data = await response.json();
      const transformData = [];
      for (let key in data) {
        transformData.push({
          id: key,
          name: data[key].name,
          productId: data[key].id,
          img: data[key].img,
        });
      }
      setItems(transformData);
    };
    fetchItems();
  }, []);

  if (items.length === 0) {
    return <Container />;
  }

  return (
    <div>
      <Route path="/home" exact>
        <AddItem items={items} />
      </Route>
      <Route path="/home/:id">
        <FormItem items={items} />
      </Route>
      <ItemsList items={items} />
    </div>
  );
};

export default Home;
