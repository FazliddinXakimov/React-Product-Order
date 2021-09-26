import React, { useState, useRef, useContext } from "react";
import { useHistory } from "react-router";
import { toast } from "react-toastify";
import { Fragment } from "react/cjs/react.production.min";
import { AuthContext } from "../../store/auth-context";
import StartingPage from "../StartingPage/StartingPage";
import Button from "../UI/Button";
import Card from "../UI/Card";
import { BiHide, BiShow } from "react-icons/bi";
import classes from "./AuthForm.module.css";

const AuthForm = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [isShow, setIsShow] = useState(false);
  const emailRef = useRef();
  const passwordRef = useRef();
  const history = useHistory();
  const authCtx = useContext(AuthContext);

  const handleShow = () => {
    setIsShow(!isShow);
  };

  const handleSelect = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const enteredEmail = emailRef.current.value;
    const enteredPassword = passwordRef.current.value;

    let url;
    const key = "AIzaSyDqLWbdLt6I-00UiH4jmJK39g4hivrsWnk";
    if (isLoggedIn) {
      url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${key}`;
    } else {
      url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${key}`;
    }

    try {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          email: enteredEmail,
          password: enteredPassword,
          returnSecureToken: true,
        }),
      });
      const data = await response.json();

      if (response.ok) {
        authCtx.login(data.idToken);
        history.push("/home");
        toast.success("Auth is Done", {
          autoClose: 1500,
          position: toast.POSITION.TOP_CENTER,
        });
      } else {
        throw new Error();
      }
    } catch (err) {
      toast.error("Auth is failed", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1500,
      });
    }
  };

  return (
    <Fragment>
      <StartingPage />
      <Card className={classes.AuthForm}>
        <h2>{isLoggedIn ? "Login" : "Sign Up"}</h2>
        <form onSubmit={submitHandler}>
          <div className={classes.formGroup}>
            <label>Email</label>
            <input type="email" ref={emailRef} />
          </div>
          <div className={classes.formGroup}>
            <label>Password</label>
            <span className={classes.inputBox}>
              <input type={!isShow ? "password" : "text"} ref={passwordRef} />
              {!isShow && (
                <BiShow onClick={handleShow} className={classes.icon} />
              )}
              {isShow && (
                <BiHide onClick={handleShow} className={classes.icon} />
              )}
            </span>
          </div>
          <Button className={classes.btn}>
            {isLoggedIn ? "Login" : "Sign Up"}
          </Button>
          <p className={classes.selectOption}>
            <a onClick={handleSelect}>
              {isLoggedIn ? "Create new account" : "Login in existing one"}
            </a>
          </p>
        </form>
      </Card>
    </Fragment>
  );
};

export default AuthForm;
