export const resultsContainer = () => {
    const $resultsContainer = document.createElement('DIV');
    $resultsContainer.classList.add('results-container');

    document.addEventListener('click', (evt) =>{
        const toMatch = ['.search-form input','.result-item']
        if(!evt.target.matches(toMatch)){
            $resultsContainer.style.display = 'none'
            document.querySelector(".search-form input").value = '';
        }
    })

    return $resultsContainer;
}