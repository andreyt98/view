import { Navbar } from "./components/Navbar";

export const App = () => {
  const root = document.querySelector("#root");
  root.innerHTML = ""
  
  root.append(Navbar());
};