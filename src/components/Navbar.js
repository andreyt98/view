import { userIcon,logo } from "../helpers/icons";

export const Navbar = () => {
  const $navBar = document.createElement("NAV");
  $navBar.classList.add("nav");
  $navBar.innerHTML = `

    <a href="#home" class="logo"> ${logo} </a>
      
    <ul class="links">
        
        <li><a href="#movies"> Movies</a> </li>
        <li><a href="#tv-shows"> TV Shows</a> </li>    
    </ul>   

    ${userIcon}  ` ;

  return $navBar;
};