import { HeroSlider } from "../components/HeroSlider.js";
import { searchBar } from "../components/searchBar.js";
import { SearchResult } from "../components/SearchResult.js";
import { Slider } from "../components/Slider.js";
import { dataRequest } from "./Fetch.js";

export const Router = () => {
  const { hash } = location;
  const root = document.getElementById("root");

  if (!hash || hash === "#home" || hash === "#movies") {
    document.querySelector('a[href="#movies"]').style.borderBottom = '1px solid red'
    root.append(
      HeroSlider("movie"),
      Slider("| Popular Movies", "movie", "popular"),
      Slider("| Upcoming Movies", "movie", "upcoming")
    );
  } else if (hash === "#tv-shows") {
    document.querySelector('a[href="#tv-shows"]').style.borderBottom = '1px solid red'

    root.append(
      HeroSlider("tv"),
      Slider("| Popular TV Shows", "tv", "popular"),
      Slider("| Airing today TV Shows", "tv", "airing_today")
    );
    
  } else if (hash.includes(`#search`)) {
    root.append(searchBar(),SearchResult() );

    const $resultsGrid = document.createElement("DIV");
    $resultsGrid.classList.add("results-grid");

    const $searchTitle = document.createElement('H2');
    
    document.addEventListener("submit", (e) => {
      e.preventDefault();
      const $resultsContainer = document.querySelector(".results-container");
      
      let query = document.querySelector("#search").value;
      if (!query) return false;
      $searchTitle.innerHTML = `<h2>Results for: ${query}</h2>`

      if (e.target.matches(".search-form")) {
        dataRequest(
          `https://api.themoviedb.org/3/search/multi?api_key=${process.env.API_K}&language=en-US&query=${query}&page=1&include_adult=false`,

          (data) => {
            data.results.forEach( (element) =>{
              
              //movie or tv show
              const mediaType = element.media_type;
              const $name =element.original_title || element.original_name;

              if (mediaType == "movie" || mediaType == "tv") {
                if (element.poster_path !== null) {
                  const $searchInfo = document.createElement("DIV");
                  $searchInfo.classList.add("result-element");

                  const $image = document.createElement("IMG");
                  $image.src = `https://image.tmdb.org/t/p/w500${element.poster_path}`;

                  $searchInfo.append($image, `${$name}`);
                  $resultsGrid.append($searchInfo);
                }
              }
            })
            
            $resultsContainer.append($searchTitle,$resultsGrid);
          }
        );

        $resultsGrid.innerHTML = "";
        document.querySelector("#search").value = "";
      }
    });
  }
};
