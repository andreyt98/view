import { Footer } from "./components/Footer.js";
import { Navbar } from "./components/Navbar.js";
import { resultsContainer } from "./components/ResultsContainer.js";
import { Router } from "./helpers/Router.js";

export const App = () => {
  const root = document.querySelector("#root");
  root.innerHTML = "";

  root.append(Navbar());
  root.append(resultsContainer());
  Router();
  root.append(Footer());
};
