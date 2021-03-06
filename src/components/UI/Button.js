import classes from "./Button.module.css";

const Button = (props) => {
  return (
    <button
      type={props.type || "submit"}
      onClick={props.onClick}
      className={`${classes.btn} ${props.className}`}
    >
      {props.children}
    </button>
  );
};

export default Button;
