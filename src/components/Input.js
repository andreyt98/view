export const Input = (inputType, placeholder, buttonText) => {
  const $input = document.createElement("DIV");

  $input.innerHTML = `
    <input type =${inputType} placeholder="${placeholder}" autocomplete="off">
    <button type="submit" >${buttonText}</button>

    `;
  return $input;
};
