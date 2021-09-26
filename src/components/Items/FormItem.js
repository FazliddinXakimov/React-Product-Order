import { useContext } from "react";
import { useHistory, useParams } from "react-router";
import useInput from "../../hook/useInput";
import { ItemsListContext } from "../../store/itemsList-provider";
import Button from "../UI/Button";
import Card from "../UI/Card";
import Input from "../UI/Input";
import classes from "./FormItem.module.css";
import { toast } from "react-toastify";

const firebase =
  "https://food-todo-f83d8-default-rtdb.asia-southeast1.firebasedatabase.app/";

const isNotEmpty = (value) => {
  return value.trim() !== "";
};

const nameValidate = (value) => {
  return value.trim() !== "" && value.length > 4 && value.length < 30;
};

const phoneValidate = (value) => {
  return value.length > 5 && value.length < 30 && !isNaN(value / 1);
};

const FormItem = ({ items }) => {
  const params = useParams();
  const history = useHistory();

  const {
    inputValue: nameValue,
    hasError: nameHasError,
    isValid: nameIsValid,
    handleChange: onNameChange,
    handleBlur: onNameBlur,
  } = useInput(nameValidate);

  const {
    inputValue: phoneValue,
    hasError: phoneHasError,
    isValid: phoneIsValid,
    handleChange: onPhoneChange,
    handleBlur: onPhoneBlur,
  } = useInput(phoneValidate);

  const {
    inputValue: dayValue,
    hasError: dayHasError,
    isValid: dayIsValid,
    handleChange: onDayChange,
    handleBlur: onDayBlur,
  } = useInput(isNotEmpty);

  const {
    inputValue: timeValue,
    hasError: timeHasError,
    isValid: timeIsValid,
    handleChange: onTimeChange,
    handleBlur: onTimeBlur,
  } = useInput(isNotEmpty);

  const { onAdd } = useContext(ItemsListContext);

  const createItem = (item, data) => {
    return {
      id: data.name,
      ...item,
    };
  };

  const handleAdd = async (item) => {
    const response = await fetch(`${firebase}orders.json`, {
      method: "POST",
      body: JSON.stringify(item),
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();

    onAdd(createItem(item, data));
  };

  // useEffect(() => {

  // }, []);

  if (items.length === 0) {
    return <p>Loading...</p>;
  }

  const product = items.filter((item) => item.id === params.id);

  let formIsValid = false;

  if (nameIsValid && phoneIsValid && dayIsValid && timeIsValid) {
    formIsValid = true;
  }

  const submitHandler = (event) => {
    event.preventDefault();

    if (formIsValid) {
      const item = {
        nameValue,
        phoneValue,
        dayValue,
        timeValue,
        img: product[0].img,
        productId: product[0].productId,
      };

      handleAdd(item);
      history.push("/home");
      toast.success("Adding Success", {
        type: toast.TYPE.INFO,
        autoClose: 1500,
        position: toast.POSITION.TOP_CENTER,
      });
    } else {
      toast.error("Form fields is not valid", {
        autoClose: 1500,
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  return (
    <Card className={classes.FormItem}>
      <h1>Create To Do App</h1>
      <div className={classes.identifier}>
        <span>{product[0].name}</span>
        <img src={product[0].img} alt="OrderItem" />
      </div>
      <form onSubmit={submitHandler}>
        <Input
          label="Customer"
          value={nameValue}
          error={nameHasError}
          onChange={onNameChange}
          onBlur={onNameBlur}
        />
        <Input
          label="Phone"
          type="text"
          value={phoneValue}
          error={phoneHasError}
          onChange={onPhoneChange}
          onBlur={onPhoneBlur}
        />
        <Input
          label="Day"
          type="date"
          value={dayValue}
          error={dayHasError}
          onChange={onDayChange}
          onBlur={onDayBlur}
        />
        <Input
          label="Time"
          type="time"
          value={timeValue}
          error={timeHasError}
          onChange={onTimeChange}
          onBlur={onTimeBlur}
        />
        <div className={classes.btnGroup}>
          <Button
            className={classes.btnBack}
            onClick={() => {
              history.push("/home");
            }}
          >
            Back
          </Button>
          <Button
            className={classes.btnSave}
            type="submit"
            disabled={formIsValid}
          >
            Save
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default FormItem;
