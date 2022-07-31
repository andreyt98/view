export const resultsContainer = () => {
    const $resultsContainer = document.createElement('DIV');
    $resultsContainer.classList.add('results-container');
    const $contenedor = document.createElement('DIV');
    $contenedor.classList.add('contenedor');

    $contenedor.append($resultsContainer)

    document.addEventListener('click', (evt) =>{
        const toMatch = ['.search-form input','.result-item']
        // if(!evt.target.matches(toMatch)){
        //     $resultsContainer.style.display = 'none'
        //     document.querySelector(".search-form input").value = '';
        // }
    })

    return $contenedor;
}