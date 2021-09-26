import { useState, useContext, useRef } from "react";
import { useHistory } from "react-router";
import { toast } from "react-toastify";
import { BiHide, BiShow } from "react-icons/bi";
import { AuthContext } from "../../store/auth-context";
import Card from "../UI/Card";
import Button from "../UI/Button";
import classes from "./Profile.module.css";

const Profile = () => {
  const [isShow, setIsShow] = useState(false);
  const passwordRef = useRef();
  const history = useHistory();
  const authCtx = useContext(AuthContext);

  const handleShow = () => {
    setIsShow(!isShow);
  };

  const url =
    "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDqLWbdLt6I-00UiH4jmJK39g4hivrsWnk";

  const submitHandler = async (e) => {
    e.preventDefault();

    const enteredPassword = passwordRef.current.value;

    try {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          password: enteredPassword,
          idToken: authCtx.token,
          returnSecureToken: false,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        toast.success("Password is changed", {
          autoClose: 1500,
          position: toast.POSITION.TOP_CENTER,
        });
        history.push("/home");
      } else {
        const errorMessage = "Invalid new password";
        throw new Error(errorMessage);
      }
    } catch (errorMessage) {
      toast.error(errorMessage, {
        autoClose: 1500,
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  return (
    <Card className={classes.Profile}>
      <h1>Profile</h1>
      <p>Update your password</p>

      <form onSubmit={submitHandler}>
        <div>
          <label>New Password</label>
          <span className={classes.inputBox}>
            <input type={!isShow ? "password" : "text"} ref={passwordRef} />
            {!isShow && (
              <BiShow onClick={handleShow} className={classes.icon} />
            )}
            {isShow && <BiHide onClick={handleShow} className={classes.icon} />}
          </span>
        </div>
        <Button className={classes.btn}>Change Password</Button>
      </form>
    </Card>
  );
};

export default Profile;
