import { useContext, Fragment } from "react";
import { Redirect, Route, Switch } from "react-router";
import { ToastContainer } from "react-toastify";
import Layout from "./components/Layout/Layout";
import Auth from "./pages/auth";
import Home from "./pages/home";
import About from "./pages/about";
import { AuthContext } from "./store/auth-context";
import Profile from "./components/Profile/Profile";
import "react-toastify/dist/ReactToastify.css";

const App = (props) => {
  const authCtx = useContext(AuthContext);

  return (
    <Fragment>
      <ToastContainer className="toast" />
      <Switch>
        <Route path="/" exact>
          <Redirect to="/auth" />
        </Route>
        <Route path="/auth">
          <Auth />
        </Route>
        {!authCtx.userIsLoggedIn && (
          <Route path="*">
            <Redirect to="/auth" />
          </Route>
        )}
        {authCtx.userIsLoggedIn && (
          <Layout>
            <Route path="/home">
              <Home />
            </Route>
            <Route path="/about">
              <About />
            </Route>

            <Route path="/profile">
              <Profile />
            </Route>
            <Route path="*">
              <Redirect to="/home" />
            </Route>
          </Layout>
        )}
      </Switch>
    </Fragment>
  );
};

export default App;
