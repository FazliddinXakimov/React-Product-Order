import classes from "./Input.module.css";

const Input = ({ type, label, error, isValid, className, ...input }) => {
  const getClasses = (error) => {
    const classInput = error
      ? `${classes.touched} ${classes.invalid}`
      : `${classes.touched}`;

    return classInput;
  };

  return (
    <div className={`${classes.formGroup} ${className}`}>
      <label>{label}</label>
      <div className={classes.inputBox}>
        <input type={type || "text"} {...input} className={getClasses(error)} />
        {error && <p>please, enter {label.toLowerCase()} property correctly</p>}
      </div>
    </div>
  );
};

export default Input;
