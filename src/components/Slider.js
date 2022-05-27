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
        
        const $rate = document.createElement("P");
        $rate.textContent = element.vote_average;
        const col = element.vote_average < 7 ? "red" : element.vote_average >= 7 && element.vote_average < 7.8 ? "yellow" : "green";

        $content.innerHTML = `
        <img src=https://image.tmdb.org/t/p/w500${element.poster_path} class="content-img"></img>
          <div class="overlay">
            <p>${mediaName}</p>
            <p style=color:${col}> ${$rate.textContent}</p>
            <button class="primary-btn" id=${element.id}>View trailer</button>    
          </div> 
        `;
        $slider.append($content);

        document.addEventListener("click", (e) => {
          if (e.target.matches(".slider button") && e.target.id == element.id) {
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
            const video = document.createElement("DIV");

            fetchData(
              `${whatToSearch}`,

              (data) => {
                const search = [
                  "Preview",
                  "Final Trailer",
                  "Trailer",
                  "Trailer 1",
                  "Official Trailer",
                  "Official Trailer 1",
                  "Trailer 2",
                  "Teaser Trailer",
                  "Official Teaser",
                  "Official HBO Max Trailer",
                  "Main Trailer",
                  "Official Trailer | Netflix",
                ];

                data.results.forEach((e) => {
                  if (search.includes(e.name)) {
                    const w = screen.width;
                    const h = screen.width < 648 ? screen.height / 2 : screen.height - 150;
                    video.innerHTML = `
                    <iframe width=${w} height=${h} src="https://www.youtube.com/embed/${e.key}" title=${e.name} frameborder="0" allowfullscreen allowautoplay ></iframe>                   
                   `;
                  } else {
                    video.innerHTML = `There's no trailer here :(`;
                  }
                });

                $overlay.append(video);
              }
            );
          }
        });
      });
      $sliderContainer.append($slider);
    }
  );

  $sliderContainer.addEventListener("click", (evt) => {
    const elementToSlide = evt.target.parentElement.parentElement.nextElementSibling;
    const screenWidth = screen.width;

    if (evt.target.matches(`.left`)) elementToSlide.scrollBy(-(screenWidth / 2), 0);
    if (evt.target.matches(`.right`)) elementToSlide.scrollBy(screenWidth / 2, 0);

    const overlay = document.querySelector(".for-video");
    if (evt.target.matches(`.close-overlay-btn`)) {
      overlay.remove();
      document.body.style.overflowY = "auto";
    }
  });

  return $sliderContainer;
};
