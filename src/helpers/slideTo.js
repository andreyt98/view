export const slideTo = (evt, element,operation) =>{
    if (evt.target.matches(`.left`)) element.scrollBy(-(operation), 0);
    if (evt.target.matches(`.right`)) element.scrollBy((operation), 0);
}