import { sliderControls } from "../helpers/icons";
const { left, right } = sliderControls;
import { fetchData } from "../helpers/fetchData";

export const Slider = (header, mediaType, category) => {
  const $sliderContainer = document.createElement("DIV");
  $sliderContainer.classList.add("slider-container");

  fetchData(
    `https://api.themoviedb.org/3/${mediaType}/${category}?api_key=${process.env.API_K}&language=en-US&page=1&include_adult=false`,

    (data) => {
      $sliderContainer.innerHTML = `
          <div class="slider-header">
            <h2>${header}</h2>
            <div class="controls">${left} ${right}</div>
          </div>
      `;

      const $slider = document.createElement("DIV");
      $slider.classList.add("slider");

      data.results.forEach((element) => {
        const $content = document.createElement("DIV");
        $content.classList.add("content");
        let mediaName = mediaType === "movie" ? element.original_title : element.name;

        $content.innerHTML = `
        <img src=https://image.tmdb.org/t/p/w500${element.poster_path} class="content-img"></img>
          <div class="overlay-bg">
            <p>${mediaName}</p>
            <button class="primary-btn">View trailer</button>    
          </div> 
        `;
        $slider.append($content);
      });
      $sliderContainer.append($slider);
    }
  );

  $sliderContainer.addEventListener("click", (evt) => {
    const elementToSlide = evt.target.parentElement.parentElement.nextElementSibling;
    const screenWidth = screen.width;

    if (evt.target.matches(`.left`)) elementToSlide.scrollBy(-(screenWidth / 2), 0);
    if (evt.target.matches(`.right`)) elementToSlide.scrollBy(screenWidth / 2, 0);
  });

  return $sliderContainer;
};
