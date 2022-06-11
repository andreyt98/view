import { HeroSlider } from "../components/HeroSlider.js";
import { Slider } from "../components/Slider.js";
export const Router = () => {
  const { hash } = location;
  const root = document.getElementById("root");
  if (!hash || hash === "#home" || hash === "#movies") {
    document.querySelector('a[href="#movies"]').style.borderBottom = "1px solid #ff4800";
    root.append(
      HeroSlider("movie"),
      Slider("| Popular", "Movies", "movie", "popular"),
      Slider("| Upcoming", "Movies", "movie", "upcoming")
    );
  } else if (hash === "#tv-shows") {
    document.querySelector('a[href="#tv-shows"]').style.borderBottom = "1px solid #ff4800";

    root.append(
      HeroSlider("tv"),
      Slider("| Popular", "TV Shows", "tv", "popular"),
      Slider("| Top Rated","TV Shows", "tv", "top_rated")
    );
  }
};
