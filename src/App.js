import { Footer } from "./components/Footer.js";
import { Navbar } from "./components/Navbar.js";
import { resultsContainer } from "./components/ResultsContainer.js";
import { Router } from "./helpers/Router.js";

// export let lang = 'en-US'
export let lang = document.querySelectorAll('.lang-selector select option').value
export let windowsWidth = document.documentElement.clientWidth;
export let isTrailerPlaying = false;

export const App = () => {
  const root = document.querySelector("#root");
  root.innerHTML = "";

  root.append(Navbar());
  root.append(resultsContainer());
  Router();
  root.append(Footer());
  lang ? document.querySelector('#language').value = lang : ""
};

document.addEventListener('change', (e) => {
    
  if(e.target.matches('#language')){

    lang = e.target.value;
    App();
  }
})
