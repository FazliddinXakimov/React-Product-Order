import { useState } from "react";

const useInput = (validateInput) => {
  const [inputValue, setInputValue] = useState("");
  const [isTouch, setIsTouch] = useState(false);

  const isValid = validateInput(inputValue);
  const hasError = !isValid && isTouch;

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleBlur = () => {
    setIsTouch(true);
  };

  return {
    inputValue,
    hasError,
    isValid,
    handleBlur,
    handleChange,
  };
};

export default useInput;
