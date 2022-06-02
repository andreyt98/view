import { fetchData } from "./fetchData.js";
 
export const renderTrailer = (element) => {

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

    fetchData( `${whatToSearch}`,

        (data) => {
            const video = document.createElement("DIV");
            if(data.results.length>0){
                const trailer = data.results.find(video => video.name === 'Official Trailer');
                const key = trailer ? trailer.key : data.results[0].key
    
                data.results.forEach((e) => {
                
                    const w = screen.width;
                    const h = screen.width < 648 ? screen.height / 2 : screen.height - 150;
    
                    video.innerHTML = ` <iframe width=${w} height=${h} src="https://www.youtube.com/embed/${key}" title=${e.name} frameborder="0" allowfullscreen allowautoplay ></iframe>  `; 
                });
            }else{
                video.innerHTML = `There's no trailer here :(`
            }

            $overlay.append(video);
        }
    );
}
