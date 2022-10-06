import { sliderControls } from "../helpers/icons";
const { left, right } = sliderControls;
import { fetchData } from "../helpers/fetchData";
import { renderTrailer } from "../helpers/renderTrailer.js";
import { lang } from "../App";

export const Slider = (header, mediaType, typeOfSearch, category) => {
  const $sliderContainer = document.createElement("DIV");
  $sliderContainer.classList.add("slider-container");

  let searchIndex =1;

  fetchData(
    `https://api.themoviedb.org/3/${typeOfSearch}/${category}?api_key=${process.env.API_K}&language=${lang}&page=1&include_adult=false`,

    (data) => {
      $sliderContainer.innerHTML = `
          <div class="slider-header">
            <h2>${header} <span>${mediaType} </span> </h2>
            <div class="controls">${left} ${right}</div>
          </div>
      `;

      const $slider = document.createElement("DIV");
      $slider.classList.add("slider");
      const $moreContent = document.createElement("DIV");
      $moreContent.classList.add("more");

      data.results.slice(0,7).forEach((element) => {
      
        let content = loadSliderContent(element);
        $slider.append(content);

        $moreContent.innerHTML = `
          <button class="primary-btn more">Load more</button>
        `;

        $slider.appendChild($moreContent);
        $sliderContainer.append($slider);

        loadTrailerOnClick(element);
      });
       
    }
  );

  $sliderContainer.addEventListener("click", (evt) => {
    const elementToSlide = evt.target.parentElement.parentElement.nextElementSibling;
    const screenWidth = screen.width;

    if (evt.target.matches(`.left`)) elementToSlide.scrollBy(-(screenWidth / 5), 0);
    if (evt.target.matches(`.right`)) elementToSlide.scrollBy(screenWidth / 5, 0);

    const overlay = document.querySelector(".for-video");
    if (evt.target.matches(`.close-overlay-btn`)) {
      overlay.remove();
      document.body.style.overflowY = "auto";
    }

    if (evt.target.matches(".more") ) {

      fetchData(
        `https://api.themoviedb.org/3/${typeOfSearch}/${category}?api_key=${process.env.API_K}&language=${lang}&page=${++searchIndex}&include_adult=false`,
        
        (data) => {
          const slider = evt.target.parentElement.parentElement;
          const $moreContent = document.createElement("DIV");
          $moreContent.classList.add("more");
          
          data.results.forEach((element) => {
            const content = loadSliderContent(element);
            slider.append(content)

            $moreContent.innerHTML = `
            <button class="primary-btn more">Load more</button>
            `;
            loadTrailerOnClick(element);
         
          });

          slider.appendChild($moreContent);
          
          const loadMoreButton = evt.target.parentElement;
          loadMoreButton.remove()
        }
      );
    }

  });

  return $sliderContainer;
};

function loadSliderContent(element){
   const $content = document.createElement("DIV");
    $content.classList.add("content");

    $content.innerHTML = `
    <img src=https://image.tmdb.org/t/p/w500/${element.poster_path} class="content-img"></img>
      <div class="overlay">
      <i class="bi bi-play-circle play" data-id=${element.id}></i>
      </div> 

      `; 
  return $content;
} 

function loadTrailerOnClick(element){
  document.addEventListener("click", (e) => {                  
    if (e.target.matches(".slider .play") && e.target.getAttribute("data-id") == element.id) {
      renderTrailer(element,lang);
    }          
  });
}