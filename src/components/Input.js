export const Input = (inputType, placeholder, hasButton, buttonText) => {
  const $input = document.createElement("DIV");

  $input.innerHTML = `
    <input type =${inputType} placeholder="${placeholder}" autocomplete="off">
    `;
    if(hasButton){
      $input.insertAdjacentHTML('beforeend',`<button type="submit">${buttonText}</button>`)
    }
  return $input;
};
