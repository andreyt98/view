import { logo, search } from "../helpers/icons";

export const Navbar = () => {
  const $navBar = document.createElement("NAV");
  $navBar.classList.add("nav");
  $navBar.innerHTML = `<a href="#home" class="logo"> ${logo} </a>

  <ul class="links">   
    <li><a href="#movies"> Movies</a> </li>
    <li><a href="#tv-shows"> TV Shows</a> </li>    
  </ul>   

  ${search}`;

  window.addEventListener("scroll", () => {
    $navBar.classList.toggle("color-on-scroll", window.scrollY > 0);
  });

  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("search-btn")) {
      window.location.hash = `search`;
    }
  });

  return $navBar;
};
