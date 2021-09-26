import { RiDeleteBin5Fill } from "react-icons/ri";
import MyImage from "../UI/LazyImage";
import classes from "./Item.module.css";

const Item = ({ item, onDelete }) => {
  if (!item) {
    <p>Loading...</p>;
  }

  return (
    <li key={item.id} className={classes.listItem}>
      <MyImage item={item} imgContainer={["3rem"]} imgSize={["3rem"]} />
      <span>
        <h3>Customer</h3>
        <p>{item.nameValue}</p>
      </span>
      <span>
        <h3>Phone</h3>
        <p>{item.phoneValue}</p>
      </span>
      <span>
        <h3>Date</h3>
        <p>{item.dayValue}</p>
      </span>
      <span>
        <h3>Time</h3>
        <p>{item.timeValue}</p>
      </span>
      <span onClick={() => onDelete(item)} className={classes.recycleBin}>
        <RiDeleteBin5Fill className={classes.deleteIcon} />
      </span>
    </li>
  );
};

export default Item;
