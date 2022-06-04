import { fetchData } from "../helpers/fetchData.js";
import { logo, search } from "../helpers/icons";
import { Input } from "./Input.js";
export const Navbar = () => {
  const $navBar = document.createElement("NAV");
  $navBar.classList.add("nav");
  $navBar.innerHTML = `
  
    <a href="#home" class="logo"> ${logo} </a>

    <ul class="links">   
      <li><a href="#movies"> Movies</a> </li>
      <li><a href="#tv-shows"> TV Shows</a> </li>    
    </ul>   

    
    <form class="search-form"> 
      ${search}
      ${Input("search", "Search", false).innerHTML}
    </form> 
    `;

  window.addEventListener("scroll", () => {
    $navBar.classList.toggle("color-on-scroll", window.scrollY > 0);
  });

  document.addEventListener('submit', (e) =>{
    e.preventDefault();
  })

  document.addEventListener("keyup", (e) => {
    if (e.target.matches(".search-form input")) {

      const $resultsContainer = document.querySelector(".results-container");
      $resultsContainer.style.display = "flex";
      
      let query = document.querySelector(".search-form input").value;
      if (!query) $resultsContainer.style.display = "none";
      
      $resultsContainer.innerHTML = "";
      fetchData(
        `https://api.themoviedb.org/3/search/multi?api_key=${process.env.API_K}&language=en-US&query=${query}&page=1&include_adult=false`,

        (data) => {
          if (data.results.length <= 0){            
            $resultsContainer.innerHTML = `There are no results for "${query}"`;
          }
          data.results.forEach((element) => {
            const { poster_path, media_type, } = element;
            const resultName = element.name || element.original_title || element.original_name;

            if ((poster_path && resultName && media_type === "movie") || media_type === "tv") {
              const $resultItem = document.createElement("DIV");
              $resultItem.classList.add("result-item");

              const $resultName = document.createElement("P");
              $resultName.textContent = `${resultName}`;

              const $resultImg = document.createElement("IMG");
              $resultImg.src = `https://image.tmdb.org/t/p/w500${poster_path}`;

              $resultItem.append($resultImg, $resultName);
              $resultsContainer.append($resultItem);
            }
          });
        }
      );
    }
  });

  return $navBar;
};
