import { Slider } from "../components/Slider";

export const Router = () => {
    const {hash} = location

    if(!hash || hash === '#home' || hash === '#movies'){
         document.getElementById('root') .append(Slider('| Popular Movies', "movie"))
    }else if(hash === '#tv-shows') {
        document.getElementById('root').append(Slider('| Popular TV Shows', "tv"))
    }   
}