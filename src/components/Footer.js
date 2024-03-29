import { Input } from "./Input.js";

export const Footer = () => {
  const $footer = document.createElement("footer");
  $footer.classList.add("footer");

  $footer.innerHTML = `

        <div class="overlay"></div>

        <div class="footer-content">   
            <div class="column">
                <h3>Get in touch</h3>
                <p>view@email.com</p>
            </div>

            <div class="column">
                <h3>Connect</h3>
                <a href=#>Twitter</a>
                <a href=#>Instagram</a>
            </div>

            <div class="column">
                <h3>Subscribe to newsletter</h3>
                <form class="footer-form">
                    ${Input("email", "email@example.com", true,"Subscribe").innerHTML}
                </form>
            </div>
         
        </div>
            
        <div class="bottom">      
            <div class="lang-selector">
                    <select name="language" id="language">
                        <option selected disabled value=""> Select trailer language</option>
                        <option value="en-US">English</option>
                        <option value="es-MX">Español</option>
                        <option value="de">Deutsch</option>
                    </select>
            </div>
            <p class="creator">Made by Andrey Torrente ⚡ 2022</p>
        </div>
           
    `;

  return $footer;
};
