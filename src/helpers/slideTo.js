export const slideTo = (evt, element,operation) =>{
    if (evt.target.matches( `.${element.parentElement.classList[0]} .left`)) element.scrollBy(-(operation), 0);
    if (evt.target.matches(`.${element.parentElement.classList[0]} .right`)) element.scrollBy((operation), 0);
}