import { fetchData } from "../helpers/fetchData";
import { sliderControls } from "../helpers/icons";
const { left, right } = sliderControls;

export const HeroSlider = (mediaType) => {
  const $sliderContainer = document.createElement("DIV");
  $sliderContainer.classList.add("hero-slider-container");

  fetchData(
    `https://api.themoviedb.org/3/trending/${mediaType}/day?api_key=${process.env.API_K}&language=en-US&page=1`,

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
          //if theres a click on the button with certain id
          if (e.target.matches(".hero-slider .play") && e.target.id == element.id) {

            //we add the overlay to the document
            const $overlay = document.createElement("DIV");
            $overlay.classList.add("overlay", "for-video");

            $overlay.insertAdjacentHTML(
              "beforeend",
              `<i class="bi bi-x-circle-fill close-overlay-btn"></i>`
            );
            document.querySelector("#root").append($overlay);

            document.body.style.overflowY = "hidden";
            const whatToSearch = location.hash.includes("#tv-shows")
              ? `https://api.themoviedb.org/3/tv/${element.id}/videos?api_key=${process.env.API_K}&language=en-US&page=1`
              : `https://api.themoviedb.org/3/movie/${element.id}/videos?api_key=${process.env.API_K}&language=en-US&page=1`;

            fetchData(
              `${whatToSearch}`,

              (data) => {
                const video = document.createElement("DIV");
                const search = ["Final Trailer", "Trailer", "Official Trailer", "Official Sneak Peek","Official Trailer 1", "Trailer 2",
                  "Teaser Trailer",
                  "Official Teaser",
                  "Official HBO Max Trailer",
                  "Main Trailer",
                  "Official Trailer | Netflix",
                ];

                data.results.forEach((e) => {
                  console.log(e);
                  if (search.includes(e.name)) {
                    const w = screen.width;
                    const h = screen.width < 648 ? screen.height / 2 : screen.height - 150;
                    video.innerHTML = `
                    <iframe width=${w} height=${h} src="https://www.youtube.com/embed/${e.key}" title=${e.name} frameborder="0" allowfullscreen allowautoplay ></iframe>                   
                   `;
                  }else{video.innerHTML = `There's no trailer here :(`}
                });
                $overlay.append(video);
              }
            );
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
    
    if (evt.target.matches(`.hero-slider-container .left`)) heroSlider.scrollBy(-screenWidth, 0);
    if (evt.target.matches(`.hero-slider-container .right`)) heroSlider.scrollBy(screenWidth, 0);
    
    const overlay = document.querySelector(".for-video");
    if (evt.target.matches(`.close-overlay-btn`)) {
      overlay.remove();
      document.body.style.overflowY = "auto";
    }
  });

  return $sliderContainer;
};
