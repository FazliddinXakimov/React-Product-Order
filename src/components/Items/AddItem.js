import { Link } from "react-router-dom";
import Card from "../UI/Card";
import MyImage from "../UI/LazyImage";
import classes from "./AddItem.module.css";

const AddItem = ({ items }) => {
  if (items.length === 0) {
    return <p>Loading..</p>;
  }

  return (
    <Card className={classes.AddItem}>
      <h1>Create To Do App</h1>
      <p>Which section do you want to add?</p>
      <div className={classes.ItemSection}>
        {items.map((item) => (
          <Link to={`/home/${item.id}`} key={item.id} className={classes.link}>
            <div className={classes.itemContainer}>
              <MyImage
                item={item}
                imgContainer={["4rem", "4.5rem"]}
                imgSize={["4rem", "4.5rem", "3.5rem"]}
              />
              <p>{item.name}</p>
            </div>
          </Link>
        ))}
      </div>
    </Card>
  );
};

export default AddItem;
