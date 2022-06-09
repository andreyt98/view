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
      
      fetchData(
        `https://api.themoviedb.org/3/search/multi?api_key=${process.env.API_K}&language=en-US&query=${query}&page=1&include_adult=false`,
        
        (data) => {
          if (data.results.length <= 0 ){            
            $resultsContainer.innerHTML = `There are no results for "${query}" `;
          }else{
            
            $resultsContainer.innerHTML = "";
            
            data.results.forEach((element) => {

              const { poster_path, media_type, name, original_title, original_name } = element;
              if(poster_path){
                if( media_type === 'tv' || media_type === 'movie'){
                  const resultName = name || original_title || original_name;
                  const image = poster_path;
                  const $resultItem = document.createElement("DIV");
                  $resultItem.classList.add("result-item");
    
                  const $resultName = document.createElement("P");
                  $resultName.textContent = `${resultName}`;
                  
                  const $resultImg = document.createElement("IMG");
                  $resultImg.src = `https://image.tmdb.org/t/p/w500${image}`;
    
                  $resultItem.append($resultImg, $resultName);
                  
                  $resultsContainer.append($resultItem);
   
                }
              }
            });
          }

        }
      );
    }
  });

  return $navBar;
};
