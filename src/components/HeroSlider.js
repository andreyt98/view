import { dataRequest } from "../helpers/Fetch";
import { play, sliderControls } from "../helpers/icons";
import { slideTo } from "../helpers/slideTo";
const { left, right } = sliderControls;

export const HeroSlider = (mediaType) => {
  const $sliderContainer = document.createElement("DIV");
  $sliderContainer.classList.add("hero-slider-container");

  dataRequest(
    `https://api.themoviedb.org/3/trending/${mediaType}/day?api_key=${process.env.API_K}&language=en-US&page=1`,

    (data) => {
      const $slider = document.createElement("DIV");
      $slider.classList.add("hero-slider");

      data.results.forEach((element) => {
        const $contentInfoHeader = mediaType === "movie"? `${element.original_title}`: `${element.name}`;

        const imageSrc = `https://image.tmdb.org/t/p/w1280${element.backdrop_path}`;

        const $content = document.createElement("DIV");
        $content.classList.add("hero-content-slider");

        $content.innerHTML = `
        
        <div class="hero-content-slider">
          <img src="${imageSrc}" class="hero-content-img" />
          <div class="overlay-bg" style="opacity:1">
          
              <div class="hero-slider-info">
                <h2>${$contentInfoHeader}</h2>
                          ${play}
              </div>      
          </div>
        </div>`;

        $slider.append($content);
      });

      const $sliderControls = document.createElement("DIV");
      $sliderControls.classList.add("controls");
      $sliderControls.innerHTML = `${left} ${right}`;

      $sliderContainer.append($slider, $sliderControls);
    }
  );

  $sliderContainer.addEventListener("click", (evt) => {
    const heroSlider = document.querySelector(".hero-slider");
    const screenWidth = screen.width;

    slideTo(evt, heroSlider, screenWidth);
  });

  return $sliderContainer;
};
