import { sliderControls } from "../helpers/icons";
const { left, right } = sliderControls;
import { dataRequest } from "../helpers/Fetch";
import { slideTo } from "../helpers/slideTo";

export const Slider = (header, mediaType, category) => {
  const $sliderContainer = document.createElement("DIV");
  $sliderContainer.classList.add("slider-container");

  dataRequest(
    `https://api.themoviedb.org/3/${mediaType}/${category}?api_key=${process.env.API_K}&language=en-US&page=1&include_adult=false`,

    (data) => {

      const $sliderHeader = document.createElement("DIV");
      $sliderHeader.classList.add("slider-header");
      $sliderHeader.innerHTML = `<h2>${header}</h2>`;
      
      const $sliderControls = document.createElement("DIV");
      $sliderControls.classList.add("controls");
      $sliderControls.innerHTML = `${left} ${right}`;
      $sliderHeader.append($sliderControls);
      
      $sliderContainer.append($sliderHeader);
      
      const $slider = document.createElement("DIV");
      $slider.classList.add("slider");

      data.results.forEach( (element) =>{

        const $content = document.createElement("DIV");
        $content.classList.add("content");
  
        const $overlay = document.createElement("DIV");
        $overlay.classList.add("overlay-bg");
  
        const $contentImg = document.createElement("IMG");
        $contentImg.classList.add("content-img");
  
        $content.appendChild($contentImg);
        $contentImg.src = `https://image.tmdb.org/t/p/w500${element.poster_path}`;
  
        const $btn = document.createElement("BUTTON");
        $btn.classList.add("primary-btn");
        $btn.textContent = "View trailer";
        const $title = document.createElement("p");
  
        let mediaName = mediaType === "movie"? element.original_title: element.name;
  
        $title.textContent = mediaName;
 
        $overlay.append($title, $btn);
        $content.append($overlay);
        $slider.append($content);

      })
      $sliderContainer.append($slider);
    }
  );

  $sliderContainer.addEventListener("click", (evt) => {
    const elementToSlide = evt.target.parentElement.parentElement.nextElementSibling;
    const screenWidth = screen.width;

    slideTo(evt, elementToSlide, screenWidth / 2);
  });

  return $sliderContainer;
};
