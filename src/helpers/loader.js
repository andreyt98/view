export const loader = () => {
    const $loader = document.createElement('IMG');
    $loader.classList.add('loader')
    $loader.src = "https://icon-library.com/images/loading-icon-transparent-background/loading-icon-transparent-background-12.jpg" 
    return $loader;
}