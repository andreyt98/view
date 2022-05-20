import { Footer } from "./components/Footer.js";
import { Navbar } from "./components/Navbar.js";
import { Router } from "./helpers/Router.js";

export const App = () => {
  const root = document.querySelector("#root");
  root.innerHTML = "";

  root.append(Navbar());
  Router();
  root.append(Footer());
};
