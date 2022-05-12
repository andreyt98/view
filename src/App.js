import { Navbar } from "./components/Navbar";
import { Router } from "./helpers/Router";

export const App = () => {
  const root = document.querySelector("#root");
  root.innerHTML = ""
  
  root.append(Navbar());
  Router();

};