import Card from "../UI/Card";
import classes from "./AboutUs.module.css";
import { AiFillGithub, AiFillPhone, AiFillFacebook } from "react-icons/ai";
import { FaTelegram, FaInternetExplorer } from "react-icons/fa";
import { BsFillPersonFill } from "react-icons/bs";
import { Link } from "react-router-dom";

const AboutUs = () => {
  return (
    <Card className={classes.AboutUs}>
      <h1>About Us</h1>
      <div className={classes.header}>
        <h3>Social Media Contacts</h3>
        <div className={classes.contact_info}>
          <div>
            <p>
              <BsFillPersonFill
                style={{
                  color: "white",
                  fontSize: "1.4rem",
                  marginRight: "1rem",
                }}
              />
              Name: Fazliddin
            </p>
            <p>
              <AiFillPhone
                style={{
                  color: "green",
                  fontSize: "1.4rem",
                  marginRight: "1rem",
                }}
              />
              Phone: <span> +998997293417</span>
            </p>
            <a href="https://fazliddinapp.netlify.app">
              <FaInternetExplorer
                style={{
                  color: "blue",
                  fontSize: "1.4rem",
                  marginRight: "1rem",
                }}
              />
              Portofilo
            </a>
          </div>
          <div>
            <a href="https://t.me/Fazliddin0109">
              <FaTelegram
                className={classes.contactIcon}
                style={{
                  color: "blue",
                  fontSize: "1.4rem",
                  marginRight: "1rem",
                }}
              />
              Telegram
            </a>
            <a href="https://www.facebook.com/fazliddin.xakimov.16">
              <AiFillFacebook
                style={{
                  color: "blue",
                  fontSize: "1.4rem",
                  marginRight: "1rem",
                }}
              />
              Facebook
            </a>

            <a href="https://github.com/FazliddinXakimov">
              <AiFillGithub
                style={{
                  color: "black",
                  fontSize: "1.4rem",
                  marginRight: "1rem",
                }}
              />
              GitHub
            </a>
          </div>
        </div>
      </div>
      <div className={classes.btnContainer}>
        <a
          href="https://firebasestorage.googleapis.com/v0/b/food-todo-f83d8.appspot.com/o/images%2FFazliddin.pdf?alt=media&token=b489097d-eaa5-4ae2-b651-db477016503d"
          target="_blank"
          download
          rel="noopener noreferrer"
          className={classes.linkBtn}
        >
          <button className={classes.downloadBtn}>Download CV</button>
        </a>
      </div>
    </Card>
  );
};

export default AboutUs;
