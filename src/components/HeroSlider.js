import { fetchData } from "../helpers/fetchData";
import { sliderControls } from "../helpers/icons";
const { left, right } = sliderControls;
import { renderTrailer } from "../helpers/renderTrailer.js";
import { lang } from "../App";

export const HeroSlider = (mediaType) => {

  const $sliderContainer = document.createElement("DIV");
  $sliderContainer.classList.add("hero-slider-container");

  fetchData(
    `https://api.themoviedb.org/3/trending/${mediaType}/day?api_key=${process.env.API_K}&language=${lang}&page=1`,

    (data) => {
      const $slider = document.createElement("DIV");
      $slider.classList.add("hero-slider");

      data.results.forEach((element) => {
        const $contentInfoHeader =
          mediaType === "movie" ? `${element.original_title}` : `${element.name}`;

        const $content = document.createElement("DIV");
        $content.classList.add("hero-content-slider");

        $content.innerHTML = `
          <img src="https://image.tmdb.org/t/p/w1280${element.backdrop_path}" class="hero-content-img" />
          <div class="overlay" style="opacity:1">
          
              <div class="hero-slider-info">
                <h2>${$contentInfoHeader}</h2>
                <i class="bi bi-play-circle-fill play" id=${element.id}></i>
              </div>      
          </div>`;

        $slider.append($content);

        document.addEventListener("click", (e) => {
          
          if (e.target.matches(".hero-slider .play") && e.target.id == element.id) {
            renderTrailer(element);
          }

        });
      });

      const $sliderControls = document.createElement("DIV");
      $sliderControls.classList.add("controls");
      $sliderControls.innerHTML = `${left} ${right}`;

      $sliderContainer.append($slider, $sliderControls);
    }
  );

  document.addEventListener("click", (evt) => {
    const heroSlider = document.querySelector(".hero-slider");
    const screenWidth = screen.width;
    
    if (evt.target.matches(`.hero-slider-container .left`)) heroSlider.scrollBy(-screenWidth/2, 0);
    if (evt.target.matches(`.hero-slider-container .right`)) heroSlider.scrollBy(screenWidth/2, 0);
    
    const overlay = document.querySelector(".for-video");
    if (evt.target.matches(`.close-overlay-btn`)) {
      overlay.remove();
      document.body.style.overflowY = "auto";
    }
  });

  return $sliderContainer;
};
