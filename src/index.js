import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import ItemsList from "./store/itemsList-provider";
import AuthProvider from "./store/auth-context";
import "./index.css";

ReactDOM.render(
  <AuthProvider>
    <ItemsList>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ItemsList>
  </AuthProvider>,

  document.getElementById("root")
);
