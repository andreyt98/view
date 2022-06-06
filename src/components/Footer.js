import { Input } from "./Input.js";

export const Footer = () => {
  const $footer = document.createElement("footer");
  $footer.classList.add("footer");

  $footer.innerHTML = `

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
    `;

  return $footer;
};
