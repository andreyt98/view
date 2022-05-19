export const Footer = () => {
  const $footer = document.createElement("footer");
  $footer.classList.add("footer");

  $footer.innerHTML = `
        <div class="column">
            <p>Get in touch</p>
        </div>

        <div class="column">
            <p>Get in touch</p>
        </div>

        <div class="column">
            <p>Get in touch</p>
        </div>
    `;

  return $footer;
};
