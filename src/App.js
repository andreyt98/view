import { Footer } from "./components/Footer.js";
import { Navbar } from "./components/Navbar.js";
import { resultsContainer } from "./components/ResultsContainer.js";
import { Router } from "./helpers/Router.js";

export let lang = 'en-US'

export const App = () => {
  const root = document.querySelector("#root");
  root.innerHTML = "";

  root.append(Navbar());
  root.append(resultsContainer());
  Router();
  root.append(Footer());
  
};

document.addEventListener('change', (e) => {
    
  if(e.target.matches('#language')){
      if(e.target.value === 'es-MX'){
        lang = 'es-MX'
        App()
      }else if(e.target.value === 'en-US'){
        lang = 'en-US'
        App()
      }else if(e.target.value === 'de'){
        lang = 'de'
        App()
      } 
  }
})
