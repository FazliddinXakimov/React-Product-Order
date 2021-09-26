import classes from "./Navbar.module.css";
import { useContext, useState } from "react";
import { FaBars } from "react-icons/fa";
import { FcHome, FcAbout, FcBusinessman, FcLeft } from "react-icons/fc";
import { Link, useHistory } from "react-router-dom";
import { AuthContext } from "../../store/auth-context";

const Navbar = () => {
  const [isShow, setIsShow] = useState(false);
  const authCtx = useContext(AuthContext);
  const history = useHistory();

  const logoutHandler = () => {
    authCtx.logout();
    history.replace("./auth");
  };

  return (
    <nav className={classes.navbar}>
      <div className={classes.navbarMenu}>
        <h1 className={classes.navbarBrand}>To Do App</h1>
        <div className={classes.navbarIcon} onClick={() => setIsShow(!isShow)}>
          {!isShow ? (
            <FaBars className={classes.reactIcon} style={{ color: "white" }} />
          ) : (
            <span className={classes.closeIcon}>X</span>
          )}
        </div>
      </div>
      <div className={`${classes.navbarItems}`}>
        <ul className={`${classes.listGroup} ${!isShow ? classes.hidden : ""}`}>
          <li>
            <Link to="/home">
              <FcHome className={classes.reactIcon} />
              Home
            </Link>
          </li>
          <li>
            <Link to="/about">
              <FcAbout className={classes.reactIcon} />
              About
            </Link>
          </li>
          <li>
            <Link to="/profile">
              <FcBusinessman className={classes.reactIcon} />
              Profile
            </Link>
          </li>

          <li onClick={logoutHandler}>
            <Link to="/login">
              <FcLeft className={classes.reactIcon} />
              Logout
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
