export const searchBar = () =>{
  const $searchBar = document.createElement('FORM');
  $searchBar.classList.add('search-form');

  $searchBar.innerHTML = 
    `
    <input type ="search" placeholder="Search something" id="search" autocomplete="off">
    `
  return $searchBar;
}

