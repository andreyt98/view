import { fetchData } from "./fetchData.js";
import { loader } from "./icons.js";
import { lang } from "../App";

export const renderTrailer = (element) => {
    
    const $overlay = document.createElement("DIV");
    $overlay.classList.add("overlay", "for-video");
    document.querySelector("#root").append($overlay); 
    $overlay.innerHTML = loader

    document.body.style.overflowY = "hidden";
    
    const whatToSearch = location.hash.includes("#tv-shows")
    ? `https://api.themoviedb.org/3/tv/${element.id}/videos?api_key=${process.env.API_K}&language=${lang}&page=1`
    : `https://api.themoviedb.org/3/movie/${element.id}/videos?api_key=${process.env.API_K}&language=${lang}&page=1`;

    fetchData( `${whatToSearch}`,

        (data) => {
            const videoContainer = document.createElement("DIV");
            videoContainer.classList.add('video-container')

            if(data.results.length>0){
                const trailer = data.results.find(video => video.name === 'Official Trailer');
                const key = trailer ? trailer.key : data.results[0].key
    
                data.results.forEach((e) => {
                    videoContainer.innerHTML = ` <iframe width=${500} height=${500} src="https://www.youtube.com/embed/${key}" title=${e.name} frameborder="0" allowfullscreen allowautoplay ></iframe>  `; 
                });
            }else{
                videoContainer.innerHTML = lang == 'en-US' ?  `There's no trailer here :(` :
                lang == 'es-MX' ? `Parece que no hay trailer, intenta nuevamente cambiando de idioma` :
                 `Es scheint, dass es keinen Trailer gibt, ändern Sie die Sprache und versuchen Sie es erneut`
            }

            $overlay.insertAdjacentHTML(
                "beforeend",
                `<i class="bi bi-x-circle-fill close-overlay-btn"></i>`
            );

            $overlay.firstChild.remove()
            $overlay.append(videoContainer);
        }
    );
}