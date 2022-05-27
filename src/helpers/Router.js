import { HeroSlider } from "../components/HeroSlider.js";
import { Slider } from "../components/Slider.js";
export const Router = () => {
  const { hash } = location;
  const root = document.getElementById("root");

  const loader = document.createElement("img");
  loader.classList.add("loader");
  loader.src = `https://cutewallpaper.org/21/loading-gif-transparent-background/Free-Content-Discovery-Influencer-Marketing-Tool-Buzzsumo-.gif`;

  if (!hash || hash === "#home" || hash === "#movies") {
    document.querySelector('a[href="#movies"]').style.borderBottom = "1px solid #e95f0f";
    root.append(
      loader,
      HeroSlider("movie"),
      Slider("| Popular Movies", "movie", "popular"),
      Slider("| Upcoming Movies", "movie", "upcoming")
    );
  } else if (hash === "#tv-shows") {
    document.querySelector('a[href="#tv-shows"]').style.borderBottom = "1px solid #e95f0f";

    root.append(
      loader,
      HeroSlider("tv"),
      Slider("| Popular TV Shows", "tv", "popular"),
      Slider("| Top Rated TV Shows", "tv", "top_rated")
    );
  }
};
