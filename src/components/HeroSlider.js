import { fetchData } from "../helpers/fetchData";
import { sliderControls } from "../helpers/icons";
const { left, right } = sliderControls;
import { renderTrailer } from "../helpers/renderTrailer.js";
import { isTrailerPlaying, lang, windowsWidth } from "../App";

export const HeroSlider = (mediaType) => {

  const $sliderContainer = document.createElement("DIV");
  $sliderContainer.classList.add("hero-slider-container");

  const $sliderControls = document.createElement("DIV");
  $sliderControls.classList.add("controls");
  $sliderContainer.appendChild($sliderControls)

  fetchData(
    `https://api.themoviedb.org/3/trending/${mediaType}/day?api_key=${process.env.API_K}&language=${lang}&page=1`,

    (data) => {
      const $slider = document.createElement("DIV");
      $slider.classList.add("hero-slider");

      data.results.slice(0,5).forEach((element) => {
        const $title =
        mediaType === "movie" ? `${element.original_title}` : `${element.name}`;
        const $rate = document.createElement("P");
        $rate.textContent = element.vote_average;
        const $content = document.createElement("DIV");
        $content.classList.add("hero-content-slider");

        const typeOfImage = window.innerWidth < 648? element.poster_path: element.backdrop_path;

        $content.innerHTML = `
          <img src="https://image.tmdb.org/t/p/w1280${typeOfImage}" class="hero-content-img" />
          <div class="overlay" style="opacity:1">     
            <div class="hero-slider-info">
              <h2>${$title}</h2>

              <div>
                <i class="bi bi-star-fill stars"></i>
                <i class="bi bi-star-fill stars"></i>
                <i class="bi bi-star-fill stars"></i>
                <i class="bi bi-star-fill stars"></i>
                <i class="bi bi-star-half stars"></i> <span style="color:lightsteelblue">(${$rate.textContent.slice(0,1)})</span>
              </div>

              <button class="primary-btn play" data-id=${element.id}>
                <i class="bi bi-play-circle-fill "></i>
                Watch Trailer
              </button> 
            </div>
                        
          </div>`;
                  
        $slider.append($content);    
        
        document.addEventListener("click", (e) => {
          if (e.target.matches(".hero-slider .play") && e.target.getAttribute("data-id") == element.id) {
            renderTrailer(element);
            isTrailerPlaying = true;
          }
        });
      });
 
      $sliderControls.innerHTML = `${left} ${right}`;

      $sliderContainer.append($slider );
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
window.addEventListener('resize', () => {
  
  if(windowsWidth < 640 && document.documentElement.clientWidth >= 640 && !isTrailerPlaying){
    window.location.reload();
    windowsWidth = document.documentElement.clientWidth;
    isTrailerPlaying = false;
  }

  if(windowsWidth >= 640 && document.documentElement.clientWidth < 640 && !isTrailerPlaying){
    window.location.reload();
    isTrailerPlaying = false;
  }
})